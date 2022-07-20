import React from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from "../store/cartSlice";

const CartItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.itemsList);
  const total = useSelector(state => state.cart.total);
  const handleClose = (e) => {
    dispatch(cartActions.setShowCart());
  }
  return (
    <div className="bg-white max-w-xl mx-auto rounded-xl p-8">
      <h2 className="text-4xl text-black font-semibold text-center pb-5">My Cart</h2>
      <div className="flex flex-col">
        <div className="my-5 space-y-5">
          {cartItems.map((cartItem, index) =>
              <CartItem key={index} id={cartItem.id} quantity={cartItem.quantity} price={cartItem.price} total={cartItem.totalPrice} name={cartItem.name} imgURL={cartItem.imgURL} />
          )}
        </div>
        <div className="text-lg text-black mb-5 font-medium text-center">Total: ${total.toFixed(2)}</div>
        <button className="bg-gradient-to-b from-yellow-400 to-amber-500 py-2 rounded-lg text-lg text-white font-semibold hover:opacity-70" type="button">
          Proceed to Checkout
        </button>
        <button className="border-2 border-gray-400 py-2 rounded-lg text-lg text-black font-semibold hover:opacity-70 mt-5" type="button" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CartItems;
