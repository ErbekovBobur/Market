import { createSlice } from '@reduxjs/toolkit';
import { getItem, removeItem, setItem } from './funcs';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        user: null,
        error: null,
        isLoading: false,
        isAdmin: false,
    },
    reducers: {
        checkUserState: state => {
            state.isLoading = true;
            if (getItem('user')) {
                state.loggedIn = true;
                state.user = getItem('user').login;
                state.isAdmin = getItem('user').admin;
            }
        },
        signUserSuccess: (state, { payload }) => {
            state.loggedIn = true;
            state.isLoading = false;
            state.user = payload.login;
            state.isAdmin = payload.admin;
            setItem('user', JSON.stringify({ login: payload.login, admin: payload.admin }))
        },
        signUserFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logoutUser: state => {
            state.user = null;
            state.loggedIn = false;
            state.isAdmin = false;
            removeItem('user');
        },
    }
})

export const { signUserFailure, checkUserState, signUserSuccess, logoutUser } = authSlice.actions

export default authSlice;