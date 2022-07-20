import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "./../store/cartSlice";

const CartItem = ({ name, quantity, total, price, id, imgURL }) => {
  const dispatch = useDispatch();
  const removeHandler = () => {
    dispatch(cartActions.removeFromCart(id));
  };
  const addHandler = () => {
    dispatch(
      cartActions.addToCart({
        id,
        name,
        price,
      })
    );
  };
  return (
    <div className="flex items-center justify-between bg-gray-200 rounded-xl p-3">
      <div className="flex items-center">
        <img src={imgURL} alt={name} className="w-20 rounded-lg aspect-square mr-5"/>
        <div>
          <p className="text-lg font-semibold break-words">{name}</p>
          <p className="text-lg font-regular italic text-gray-600">${price}, Total ${total}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-1">
        <button className="px-2 py-1 bg-white text-gray-600 rounded-lg" onClick={addHandler}>
          +
        </button>
        <div>{quantity}</div>
        <button className="px-3 py-1 bg-gray-600 text-white rounded-lg" onClick={removeHandler}>
          -
        </button>
      </div>
    </div>
  );
};

export default CartItem;
