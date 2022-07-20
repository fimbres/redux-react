import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCartData = createAsyncThunk('get/cart-data', async () => {
    return fetch("https://redux-toolkit-project-6cfe2-default-rtdb.firebaseio.com/cartItems.json")
    .then(response => response.json()).catch(error => console.log(error));
});

export const sendCartData = createAsyncThunk('send/cart-data', (cart) => {
    return fetch("https://redux-toolkit-project-6cfe2-default-rtdb.firebaseio.com/cartItems.json",{
            method: "PUT",
            body: JSON.stringify(cart)
    }).then(response => response.json()).catch(error => console.log(error));
});

export const getProductsData = createAsyncThunk('get/products-data', async () => {
    return fetch("https://redux-toolkit-project-6cfe2-default-rtdb.firebaseio.com/productsItems.json")
    .then(response => response.json()).catch(error => console.log(error));
});

export const getPopularProductsData = createAsyncThunk('get/popular-products-data', async () => {
    return fetch("https://redux-toolkit-project-6cfe2-default-rtdb.firebaseio.com/popularProductsItems.json")
    .then(response => response.json()).catch(error => console.log(error));
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        products: [],
        popularProducts: [],
        itemsList: [],
        totalQuantity: 0,
        total: 0,
        showCart: false,
        changed: false,
        loading: false,
        errors: null,
    },
    reducers: {
        addToCart(state, action) {
            state.changed = true;
            const newItem = action.payload;
            const existingItem = state.itemsList.find(item => item.id === newItem.id);
            if(existingItem){
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
            else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    imgURL: newItem.imgURL,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                });
                state.totalQuantity++;
            }
            state.total += newItem.price;

        },
        removeFromCart(state, action) {
            state.changed = true;
            const id = action.payload;
            const existingItem = state.itemsList.find(item => item.id === id);
            if(existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id);
                state.totalQuantity--;
            }
            else{
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
            state.total -= existingItem.price;
            if(state.totalQuantity === 0){
                state.showCart = false;
            }
        },
        setShowCart(state){
            if(state.totalQuantity > 0){
                state.showCart = !state.showCart;
            }
            else{
                state.showCart = false;
            }
        },
        clearCart(state){
            if(state.totalQuantity > 0){
                state.itemsList = [];
                state.totalQuantity = 0;
                state.total = 0;
                state.changed = true;
            }
        }
    },
    extraReducers: {
        [getCartData.pending]: (state) => {
            state.loading = true;
        },
        [getCartData.fulfilled]: (state, action) => {
            state.totalQuantity = action.payload.totalQuantity;
            state.total = action.payload.total;
            state.itemsList = action.payload.itemsList;
            state.errors = null;
            state.loading = false;
        },
        [getCartData.rejected]: (state) => {
            state.errors = 'Something went wrong';
        },
        [sendCartData.pending]: (state) => {
            state.loading = true;
        },
        [sendCartData.fulfilled]: (state) => {
            state.changed = false;
            state.errors = null;
            state.loading = false;
        },
        [sendCartData.rejected]: (state) => {
            state.errors = 'Something went wrong';
        },
        [getProductsData.pending]: (state) => {
            state.loading = true;
        },
        [getProductsData.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.errors = null;
            state.loading = false;
        },
        [getProductsData.rejected]: (state) => {
            state.errors = 'Something went wrong';
        },
        [getPopularProductsData.pending]: (state) => {
            state.loading = true;
        },
        [getPopularProductsData.fulfilled]: (state, action) => {
            state.popularProducts = action.payload;
            state.errors = null;
            state.loading = false;
        },
        [getPopularProductsData.rejected]: (state) => {
            state.errors = 'Something went wrong';
        },
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice;