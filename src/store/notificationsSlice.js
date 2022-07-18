import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: { notifications: null },
    reducers: {
        showNotification(state, action) {
            state.notifications = {
                message: action.payload.message,
                type: action.payload.type,
                open: action.payload.open,
            }
        }
    }
});

export const notificationsActions = notificationsSlice.actions;
export default notificationsSlice;
