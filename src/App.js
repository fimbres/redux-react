import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { Notifications } from "./components/Notifications";
import { sendCartData, getCartData } from "./store/cartSlice";

let isFirstRender = true;

function App() {
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
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

  return (
    <div className="App">
      {notifications && <Notifications type={notifications.type} message={notifications.message} open={notifications.open}/>}
      {
        isLoggedIn ? <Layout />
        : <Auth />
      }
    </div>
  );
}

export default App;
