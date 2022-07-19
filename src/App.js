import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as auth from "firebase/auth";

import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { Notifications } from "./components/Notifications";
import { sendCartData, getCartData } from "./store/cartSlice";
import { initialize } from './utils/firebase';
import { authActions } from "./store/authSlice";

export const appKey = initialize();
export const authKey = auth.getAuth(appKey);
let isFirstRender = true;

function App() {
  const cart = useSelector(state => state.cart);
  const currentUser = useSelector(state => state.auth.currentUser);
  const notifications = useSelector(state => state.notifications.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  useEffect(() => {
    if(isFirstRender){
      isFirstRender = false;
      return;
    }
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  auth.onAuthStateChanged(authKey, user => {
    if(user){
        dispatch(authActions.setUser(user.email));
    }
    else{
      dispatch(authActions.setUser(null));
    }
  });

  return (
    <div className="App">
      {notifications && <Notifications type={notifications.type} message={notifications.message} open={notifications.open}/>}
      {
        currentUser ? <Layout />
        : <Auth />
      }
    </div>
  );
}

export default App;
