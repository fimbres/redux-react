import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import notificationsSlice from "./notificationsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        cart: cartSlice.reducer,
        notifications: notificationsSlice.reducer,
    }
});

export default store;
