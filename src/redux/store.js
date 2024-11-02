import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import todosReducer from './slice/todosSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        todos: todosReducer,
    }
});

export default store;
