import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getTodosQuery from '../../hooks/useGetTodos/getTodos.gql';
import addTodoMutation from '../../hooks/useAddTodos/addTodos.gql';
import deleteTodoMutation from "../../hooks/useRemoveTodo/removeTodo.gql";
import changeTodoStatusMutation from "../../hooks/useTodoStatus/changeTodoStatus.gql";
import toast from 'react-hot-toast';

const BASE_URL = 'https://app.first-roadmap.test/graphql';

const fetchGraphQL = async (query, variables = {}) => {
    const token = localStorage.getItem('customerToken');
    if (!token) throw new Error('Authentication required.');

    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables })
    });

    const result = await response.json();
    if (response.ok && !result.errors) {
        return result;
    } else {
        throw new Error(result.errors ? result.errors.map(err => err.message).join(', ') : 'GraphQL request failed');
    }
};

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
    const data = await fetchGraphQL(getTodosQuery);
    return data.data.getCustomerTodos;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (taskId) => {
    await fetchGraphQL(deleteTodoMutation(), { taskId });
    return { taskId };
});

export const changeTodoStatus = createAsyncThunk('todos/changeTodoStatus', async ({ taskId, status }) => {
    await fetchGraphQL(changeTodoStatusMutation(), { taskId, status });
    return { taskId, status };
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todoData) => {
    const data = await fetchGraphQL(addTodoMutation(), { input: todoData });
    return data.data.createTask;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: {
            initLoaded: false,
            todos: [],
        },
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.todos.initLoaded = true;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.todos = {
                    initLoaded: true,
                    todos: action.payload,
                };
                toast.success('Get tasks successful!');
                localStorage.setItem('customerTodos', JSON.stringify(action.payload));
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.error = action.error.message;
                toast.error('Get tasks failed!');
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.todos.push(action.payload);
                toast.success('Create new task!');
                localStorage.setItem('customerTodos', JSON.stringify(state.todos.todos));
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.error = action.error.message;
                toast.error('Create new task failed!');
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos.todos = state.todos.todos.filter(todo => todo.id !== action.payload.taskId);
                toast.success('Remove task!');
                localStorage.setItem('customerTodos', JSON.stringify(state.todos.todos));
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                toast.error('Remove task failed!');
                state.error = action.error.message;
            })
            .addCase(changeTodoStatus.fulfilled, (state, action) => {
                const { taskId, status } = action.payload;
                const updatedTodos = state.todos.todos.map(todo =>
                    todo.id === taskId ? { ...todo, status } : todo
                );
                state.todos.todos = updatedTodos;
                toast.success('Task status updated!');
                localStorage.setItem('customerTodos', JSON.stringify(updatedTodos));
            })
            .addCase(changeTodoStatus.rejected, (state, action) => {
                state.error = action.error.message;
                toast.error('Update task status failed!');
            });
    },
});

export const selectTodos = (state) => state.todos.todos;
export const selectLoading = (state) => state.todos.loading;
export const selectError = (state) => state.todos.error;
export const initLoaded = (state) => state.todos.initLoaded;

export default todosSlice.reducer;
