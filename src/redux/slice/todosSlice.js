import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getTodosQuery from '../../hooks/useGetTodos/getTodos.gql';
import addTodoMutation from '../../hooks/useAddTodos/addTodos.gql';

export const getTodos = createAsyncThunk('todos/getTodos', async (_, { getState }) => {
    const token = localStorage.getItem('customerToken');
    if (!token) return [];
    const response = await fetch('https://app.test.test/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query: getTodosQuery }),
    });

    const data = await response.json();

    if (data.errors) {
        throw new Error(data.errors.map(err => err.message).join(', '));
    }

    return data.data.getCustomerTodos;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todoData, { getState }) => {
    const token = localStorage.getItem('customerToken');

    if (!token) throw new Error('Authentication required.');

    const response = await fetch('https://app.test.test/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: addTodoMutation(),
            variables: { input: todoData }
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
                localStorage.setItem('customerTodos', JSON.stringify(action.payload));
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(addTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.push(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectTodos = (state) => state.todos.todos;
export const selectLoading = (state) => state.todos.loading;
export const selectError = (state) => state.todos.error;

export default todosSlice.reducer;