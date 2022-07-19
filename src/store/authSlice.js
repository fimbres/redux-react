import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        currentUser: null
    },
    reducers: {
        login(state, action) {
            state.currentUser = action.payload;
            localStorage.setItem("authUser", JSON.stringify(state.currentUser));
        },
        getUser(state) {
            state.currentUser = JSON.parse(localStorage.getItem("authUser"));
        },
        logout(state) {
            state.currentUser = null;
            localStorage.removeItem("authUser");
        },
    }
});

export const authActions = authSlice.actions;
export default authSlice;