import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState:{
        counter: 0
    },
    reducers: {
        increment(state, action) {
            state.counter++;
        },
        decrement(state, action) {
            state.counter--;
        },
        addValue(state, action) {
            state.counter += action.payload;
        }
    }
});

const store = configureStore({
    reducer: counterSlice.reducer
});

export default store;
export const actions = counterSlice.actions;
