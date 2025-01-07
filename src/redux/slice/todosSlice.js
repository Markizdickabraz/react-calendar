import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import getTodosQuery from '../../hooks/useGetTodos/getTodos.gql';
import addTodoMutation from '../../hooks/useAddTodos/addTodos.gql';
import deleteTodoMutation from "../../hooks/useRemoveTodo/removeTodo.gql";
import toast from 'react-hot-toast';

export const getTodos = createAsyncThunk('todos/getTodos', async (_, {getState}) => {
    const token = localStorage.getItem('customerToken');
    if (!token) return [];
    const response = await fetch('https://app.first-roadmap.test/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({query: getTodosQuery}),
    });

    const data = await response.json();

    if (data.errors) {
        throw new Error(data.errors.map(err => err.message).join(', '));
    }

    return data.data.getCustomerTodos;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (taskId, {getState}) => {
    const token = localStorage.getItem('customerToken');
    if (!token) throw new Error('Authentication required.');

    const response = await fetch('https://app.first-roadmap.test/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: deleteTodoMutation(),
            variables: {taskId}
        })
    });

    const result = await response.json();

    if (response.ok && !result.errors) {
        return {taskId};
    } else {
        throw new Error(result.errors ? result.errors.map(err => err.message).join(', ') : 'Failed to delete task');
    }
});


export const addTodo = createAsyncThunk('todos/addTodo', async (todoData, {getState}) => {
    const token = localStorage.getItem('customerToken');

    if (!token) throw new Error('Authentication required.');

    const response = await fetch('https://app.first-roadmap.test/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: addTodoMutation(),
            variables: {input: todoData}
        })
    });

    const result = await response.json();

    if (response.ok && !result.errors) {
        return result.data.createTask;
    } else {
        throw new Error(result.errors ? result.errors.map(err => err.message).join(', ') : 'Failed to create task');
    }
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
                toast.success('Get tasks successful!');
                localStorage.setItem('customerTodos', JSON.stringify(action.payload));
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.success('Get tasks failed!');
            })

            .addCase(addTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                console.log('123123')
                state.loading = false;
                state.todos.push(action.payload);
                toast.success('Create new task!');
                localStorage.setItem('customerTodos', JSON.stringify(state.todos));
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.success('Create new task failed!');
            })
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter(todo => todo.id !== action.payload.taskId);
                toast.success('Remove task!');
                localStorage.setItem('customerTodos', JSON.stringify(state.todos));
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                toast.success('Remove task failed!');
                state.error = action.error.message;
            });
    },
});

export const selectTodos = (state) => state.todos.todos;
export const selectLoading = (state) => state.todos.loading;
export const selectError = (state) => state.todos.error;

export default todosSlice.reducer;
