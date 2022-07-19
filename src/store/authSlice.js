import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Auth from "firebase/auth";

import { authKey } from '../App';

export const signup = createAsyncThunk('auth/signup', (data) => {
    return Auth.createUserWithEmailAndPassword(authKey, data.name, data.password)
    .then(userCredential => console.log(userCredential))
    .catch(error => console.log(error));
});

export const login = createAsyncThunk('auth/login', (data) => {
    return Auth.signInWithEmailAndPassword(authKey, data.name, data.password)
    .then(userCredential => console.log(userCredential))
    .catch(error => console.log(error));
});

export const googleLogin = createAsyncThunk('auth/google-login', () => {
    const provider = new Auth.GoogleAuthProvider();
    return Auth.signInWithPopup(authKey, provider)
    .then(userCredential => console.log(userCredential))
    .catch(error => console.log(error));
});

export const facebookLogin = createAsyncThunk('auth/facebook-login', () => {
    const provider = new Auth.FacebookAuthProvider();
    return Auth.signInWithPopup(authKey, provider)
    .then(userCredential => console.log(userCredential))
    .catch(error => console.log(error));
});

export const logout = createAsyncThunk('auth/logout', () => {
    return Auth.signOut(authKey)
    .then(result => console.log(result))
    .catch(error => console.log(error));
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        currentUser: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setUser(state, action){
            state.currentUser = action.payload;
        }
    },
    extraReducers: {
        [signup.pending]:(state) => {
            state.isLoading = true;
        },
        [signup.fulfilled]:(state, action) => {
            console.log("data", action);
            state.error = null;
            state.isLoading = false;
        },
        [signup.rejected]:(state) => {
            state.error = 'Something went wrong';
            state.isLoading = false;
        },
        [login.pending]:(state) => {
            state.isLoading = true;
        },
        [login.fulfilled]:(state, action) => {
            console.log("data", action);
            state.error = null;
            state.isLoading = false;
        },
        [login.rejected]:(state) => {
            state.error = 'Something went wrong';
            state.isLoading = false;
        },
        [googleLogin.pending]:(state) => {
            state.isLoading = true;
        },
        [googleLogin.fulfilled]:(state, action) => {
            console.log("data", action);
            state.error = null;
            state.isLoading = false;
        },
        [googleLogin.rejected]:(state) => {
            state.error = 'Something went wrong';
            state.isLoading = false;
        },
        [facebookLogin.pending]:(state) => {
            state.isLoading = true;
        },
        [facebookLogin.fulfilled]:(state, action) => {
            console.log("data", action);
            state.error = null;
            state.isLoading = false;
        },
        [facebookLogin.rejected]:(state) => {
            state.error = 'Something went wrong';
            state.isLoading = false;
        },
        [logout.pending]:(state) => {
            state.isLoading = true;
        },
        [logout.fulfilled]:(state, action) => {
            console.log("data", action);
            state.error = null;
            state.isLoading = false;
        },
        [logout.rejected]:(state) => {
            state.error = 'Something went wrong';
            state.isLoading = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;