import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { cartActions } from "../store/cartSlice";

const Product = ({ name, id, imgURL, price }) => {
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
    <div className="flex items-center justify-between bg-gray-200 rounded-xl p-5">
      <div className="flex items-center">
        <img src={imgURL} alt={name} className="w-20 rounded-lg aspect-square mr-5"/>
        <div>
          <p className="text-lg font-semibold break-words">{name}</p>
          <p className="text-lg font-regular italic text-gray-600">${price.toFixed(2)}</p>
        </div>
      </div>
      <button className="px-4 py-2 rounded-lg bg-gradient-to-b from-yellow-400 to-amber-500 text-white hover:opacity-70" onClick={addToCart}>Add to cart</button>
    </div>
  );
};

export default Product;
