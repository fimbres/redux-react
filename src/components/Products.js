import React from "react";
import { useSelector } from "react-redux";

import Product from "./Product";
import CoverImg from "../media/cover.png";
import PopularProduct from "./PopularProduct";

const Products = () => {
  const popularProducts = useSelector(state => state.cart.popularProducts);
  const products = useSelector(state => state.cart.products);
  
  return (
    <div className="flex flex-col md:flex-row w-full h-full space-y-5 md:space-y-0 space-x-0 md:space-x-10">
      <div className="flex flex-col w-full space-y-5 md:space-y-10">
        <div className="flex justify-center relative rounded-3xl h-full overflow-hidden">
          <img src={CoverImg} className="absolute object-cover h-full w-full" alt="cover"/>
          <div className="flex flex-col justify-end items-start w-full p-5 lg:p-10" style={{zIndex: "5"}}>
            <div className="text-white text-xl lg:text-4xl w-1/2 break-words mb-5">Shoping Your Best Products!</div>
            <button className="bg-gradient-to-b from-yellow-400 to-amber-500 px-5 py-2 rounded-xl text-white text-regular md:text-lg hover:opacity-70">See More</button>
          </div>
        </div>
        <div className="w-full bg-white rounded-3xl p-5 md:p-10 h-full">
          <div className="text-2xl font-semibold mb-5">Popular Products</div>
          <div className="flex flex-col lg:flex-row justify-items-stretch space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
          {popularProducts.map((product, index) => (
              <PopularProduct
                key={index}
                id={product.id}
                name={product.name}
                imgURL={product.imgURL}
                price={product.price}
              />
          ))}
        </div>
        </div>
      </div>
      <div className="flex flex-col w-full bg-white rounded-3xl p-5 md:p-10">
        <div className="text-2xl font-semibold mb-5">All The Products</div>
        <div className="grid h-full justify-items-stretch space-y-5">
          {products.map((product, index) => (
              <Product
                key={index}
                id={product.id}
                name={product.name}
                imgURL={product.imgURL}
                price={product.price}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
