import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Notifications } from "../components/Notifications";
import { authActions, logout } from "../store/authSlice";
import { cartActions } from "../store/cartSlice";
import LogoImg from '../media/logo.png';
import GuestImg from '../media/guest.jpg';

const Header = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.notifications);
  const quantity = useSelector(state => state.cart.totalQuantity);
  const currentUser = useSelector(state => state.auth.currentUser);
  const showCart = () => {
    dispatch(cartActions.setShowCart());
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleLogin = () => {
    dispatch(authActions.setShowLoginModal());
  };
  const handleSignup = () => {
    dispatch(authActions.setShowSignupModal());
  };

  return (
    <header>
      {notifications && <Notifications type={notifications.type} message={notifications.message} open={notifications.open}/>}
      <nav className="fixed inset-x-0 top-0 z-10 bg-white rounded-3xl m-5 md:m-10">
        <ul className="flex justify-between items-center px-3 md:px-10 py-3">
          <li>
            <img src={LogoImg} alt="logo" className="h-10 md:h-16"/>
          </li>
          {!currentUser && <li className="flex items-center space-x-3">
            <div to="/login" className="text-regular lg:text-lg mx-2 lg:mx-5 font-medium hover:opacity-60 text-gray-700 cursor-pointer" onClick={handleLogin}>Login</div>
            <div to="/signup" className="text-regular lg:text-lg mx-2 lg:mx-5 font-medium hover:opacity-60 text-gray-700 cursor-pointer" onClick={handleSignup}>Signup</div>
          </li>}
          {currentUser && <li className="flex items-center space-x-5">
            <span onClick={quantity > 0 ? showCart : undefined} className="text-lg font-medium cursor-pointer hover:opacity-70">
              My Cart
              {quantity > 0 && <span className="py-0.5 px-2 ml-2 bg-gradient-to-b from-yellow-400 to-amber-500 text-white font-medium rounded-full aspect-square">
                {quantity}
              </span>}
            </span>
            <button className="hidden md:inline bg-gradient-to-b from-fuchsia-500 to-violet-500 text-white text-lg rounded-xl px-5 py-2 hover:opacity-70" onClick={handleLogout}>Logout</button>
            <img src={currentUser.photo ? currentUser.photo : GuestImg} alt="logo" className="hidden md:inline h-12 rounded-full aspect-square"/>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
