import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { Notifications } from "./components/Notifications";
import { sendCartData, getCartData } from "./store/cartSlice";
import { authActions } from './store/authSlice';

let isFirstRender = true;

function App() {
  const cart = useSelector(state => state.cart);
  const currentUser = useSelector(state => state.auth.currentUser);
  const notifications = useSelector(state => state.notifications.notifications);
  const dispatch = useDispatch();
  const firebaseConfig = {
    apiKey: "AIzaSyBeBad9Rxdv9pN0R31xFI65fY6aaR8L_lU",
    authDomain: "redux-toolkit-project-6cfe2.firebaseapp.com",
    databaseURL: "https://redux-toolkit-project-6cfe2-default-rtdb.firebaseio.com",
    projectId: "redux-toolkit-project-6cfe2",
    storageBucket: "redux-toolkit-project-6cfe2.appspot.com",
    messagingSenderId: "572290845552",
    appId: "1:572290845552:web:a7216fa05bdcd9a24c5db5",
    measurementId: "G-MG2N18W2EC"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  useEffect(() => {
    dispatch(authActions.getUser());
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
