import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { cartActions } from "../store/cartSlice";

const PopularProduct = ({ name, id, imgURL, price }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);
  const addToCart = () => {
    if(currentUser){
      dispatch(cartActions.addToCart({id, name, price, imgURL }));
    }
    else{
      dispatch(authActions.setShowLoginModal());
    }
  }
  return (
    <div className="flex flex-col justify-center bg-gray-200 w-full rounded-xl p-5">
      <div className="flex flex-col items-center">
        <img src={imgURL} alt={name} className="w-40 rounded-lg aspect-square mb-5"/>
        <div className="text-center">
          <p className="text-lg font-semibold break-words">{name}</p>
          <p className="text-lg font-regular italic text-gray-600 pb-5">${price}</p>
        </div>
      </div>
      <button className="px-4 py-2 rounded-lg bg-gradient-to-b from-yellow-400 to-amber-500 text-white hover:opacity-70" onClick={addToCart}>Add to cart</button>
    </div>
  );
};

export default PopularProduct;
