import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import signUpMutation from '../../hooks/useSignUp/signUp.gql';
import signInMutation from '../../hooks/useSignIn/signIn.gql';
import logoutMutation from '../../hooks/useLogout/logout.gql';
import toast from 'react-hot-toast';

export const signUp = createAsyncThunk(
    'user/signUp',
    async (formData, {dispatch, rejectWithValue}) => {
        const query = signUpMutation(formData);

        try {
            const response = await fetch('https://app.first-roadmap.test/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query}),
            });

            const data = await response.json();
            if (data.errors) {
                return rejectWithValue(data.errors);
            }
            const {email, password} = formData;
            const signInResult = await dispatch(signIn({email, password})).unwrap();

            return signInResult;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signIn = createAsyncThunk(
    'user/signIn',
    async ({email, password}, {rejectWithValue}) => {
        const {query, variables} = signInMutation({email, password});
        try {
            const response = await fetch('https://app.first-roadmap.test/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({query, variables}),
            });

            const data = await response.json();

            if (data.errors) {
                return rejectWithValue(data.errors);
            }

            const token = data.data.generateCustomerToken.token;
            localStorage.setItem('customerToken', token);


            return token;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async (_, {rejectWithValue}) => {
        const query = logoutMutation();

        try {
            const response = await fetch('https://app.first-roadmap.test/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('customerToken')}`,
                },
                body: JSON.stringify(query),
            });

            const data = await response.json();
            if (data.errors) {
                return rejectWithValue(data.errors);
            }

            localStorage.removeItem('customerToken');
            localStorage.removeItem('customerTodos');

            return null;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({

    name: 'user',
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(signUp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
                toast.success('Sign-up successful!');
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error('Sign-up failed!');
            })
            .addCase(signIn.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
                toast.success('Sign-in successful!');
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error('Sign-in failed!');
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.status = 'idle';
                state.error = null;
                toast.success('Logged out successfully!');
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {logout: clearUser} = userSlice.actions;

export default userSlice.reducer;
