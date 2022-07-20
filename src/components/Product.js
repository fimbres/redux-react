import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { cartActions } from "../store/cartSlice";

const Product = ({ name, id, imgURL, price, className }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);
  const customClass = className ? className : "";
  const addToCart = () => {
    if(currentUser){
      dispatch(cartActions.addToCart({id, name, price, imgURL }));
    }
    else{
      dispatch(authActions.setShowLoginModal());
    }
  }
  
  return (
    <div className={"flex flex-col lg:flex-row justify-between bg-gray-100 rounded-xl p-3" + customClass}>
      <div className="flex justify-between lg:justify-start items-start md:items-center w-full">
        <img src={imgURL} alt={name} className="w-20 rounded-lg aspect-square mr-5"/>
        <div className="text-right md:text-left">
          <p className="text-regular md:text-lg font-semibold break-words">{name}</p>
          <p className="text-regular md:text-lg font-regular italic text-gray-600">${price.toFixed(2)}</p>
        </div>
      </div>
      <button className="w-full lg:w-max lg:my-auto px-4 py-2 rounded-lg bg-gradient-to-b from-yellow-400 to-amber-500 text-white mt-5 hover:opacity-70 text-regular" onClick={addToCart}>Add to cart</button>
    </div>
  );
};

export default Product;
