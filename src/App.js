import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import * as auth from "firebase/auth";

import Auth from "./components/Auth";
// import Layout from "./components/Layout";
import { sendCartData, getCartData } from "./store/cartSlice";
import { initialize } from './utils/firebase';
import { authActions } from "./store/authSlice";
import Products from "./components/Products";
import Header from "./components/Header";
import Modal from "./components/Modal";
import CartItems from "./components/CartItems";

export const appKey = initialize();
export const authKey = auth.getAuth(appKey);
let isFirstRender = true;

function App() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const showLoginModal = useSelector(state => state.auth.showLoginModal);
  const showSignupModal = useSelector(state => state.auth.showSignupModal);
  const showCartModal = useSelector(state => state.cart.showCart);

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
        dispatch(authActions.setUser({email: user.email, photo: user.photoURL}));
    }
    else{
      dispatch(authActions.setUser(null));
    }
  });

  return (
    <div className="bg-gray-200 px-10 pb-10 pt-44 h-screen">
      <Header />
        <Routes>
          <Route path="/" element={<Products/>}/>
          <Route path="*" element={<h2>not found</h2>}/>
        </Routes>
      <Modal showModal={showLoginModal}>
        <Auth type="login"/>
      </Modal>
      <Modal showModal={showSignupModal}>
        <Auth type="signup"/>
      </Modal>
      <Modal showModal={showCartModal}>
        <CartItems/>
      </Modal>
    </div>
  );
}

export default App;
