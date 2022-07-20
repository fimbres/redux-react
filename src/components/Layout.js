import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";

const Layout = () => {
  const showCart = useSelector(state => state.cart.showCart);
  // const currentUser = useSelector(state => state.auth.currentUser);

  return (
    <>
      <Header />
      {showCart && <CartItems />}
    </>
  );
};

export default Layout;
