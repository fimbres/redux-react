import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { notificationsActions } from "./notificationsSlice";

export const getCartData = createAsyncThunk('get/cart-data', async () => {
    const fetchHandler = async () => {
        const result = await fetch("https://redux-toolkit-project-6cfe2-default-rtdb.firebaseio.com/cartItems.json");
        const data = await result.json();
        return data;
    }
    try{
        const cartData = await fetchHandler();
        useDispatch(cartActions.replaceData(cartData));
    }
    catch (err) {
        useDispatch(notificationsActions.showNotification({
            open: true,
            message: 'Sent request to database failed',
            type: 'error',
        }));
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        itemsList: [],
        totalQuantity: 0,
        total: 0,
        showCart: false,
        changed: false,
    },
    reducers: { 
        replaceData(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.total = action.payload.total;
            state.itemsList = action.payload.itemsList;
        },
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
            }
            else{
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
            state.total -= existingItem.price;
        },
        setShowCart(state){
            state.showCart = !state.showCart;
        }
    },
    extraReducers: {
        [getCartData.fulfilled]: (state, action) => {
            state.cartItems = action.payload
        },
    }
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(notificationsActions.showNotification({
            open: true,
            message: 'Sending Request',
            type: 'warning',
          })
        );
        const sendCart = async () => {
            const result = await fetch("https://redux-toolkit-project-6cfe2-default-rtdb.firebaseio.com/cartItems.json",{
              method: "PUT",
              body: JSON.stringify(cart)
            });
            const data = await result.json();
            dispatch(notificationsActions.showNotification({
              open: true,
              message: 'Sent request to database successfully',
              type: 'success',
            }));
        };
        
        try{
            await sendCart();
        }
        catch(err) {
            dispatch(notificationsActions.showNotification({
                open: true,
                message: 'Sent request to database failed',
                type: 'error',
            }));
        }
    }
};

export const cartActions = cartSlice.actions;
export default cartSlice;