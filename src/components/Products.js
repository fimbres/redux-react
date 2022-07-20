import React from "react";

import Product from "./Product";
import CoverImg from "../media/cover.png";
import PopularProduct from "./PopularProduct";

const products = [
  {
    id: 1,
    name: "Nike Vapormax Plus Triple Black",
    imgURL:
      "https://th.bing.com/th/id/R.c9043541771fc0441534d08600a189d6?rik=NU6Vu6cyTjbQ7g&riu=http%3a%2f%2fimportedproducts.in%2fwp-content%2fuploads%2f2021%2f04%2fNike_black_dark2.jpeg&ehk=cTELzS7rU2sE4x3u%2b%2fPloREOH5qcYRW%2bGSBBWAys6xs%3d&risl=&pid=ImgRaw&r=0",
    price: 450.78,
    stars: 4.5
  },
  {
    id: 2,
    name: "Nike Air Backpack",
    imgURL:
      "https://th.bing.com/th/id/R.2562ac167993bd6e4f398d8bfe4d8ab4?rik=u9bl7Dme%2bThxYg&riu=http%3a%2f%2fcontent.backcountry.com%2fimages%2fitems%2f900%2fNKE%2fNKE013L%2fFLIGRE.jpg&ehk=XpigVs4BoIBMX2T3VHn86tdM9%2fAqLxpPuXsTpLqGcuM%3d&risl=&pid=ImgRaw&r=0",
    price: 25.99,
    stars: 3
  },
  {
    id: 3,
    name: "Nike Air Pants",
    imgURL:
      "https://www.cosmossport.gr/2139173-product_large/nike-m-df-run-stripe-wvn-pant.jpg",
    price: 105.34,
    stars: 4.5
  },
  {
    id: 4,
    name: "Nike Hoodie Fleece",
    imgURL:
      "https://media.topsports24.de/Artikelbilder/1000px/Nike_AW77_Fleece_Hoodie_598707-010.jpg",
    price: 99.99,
    stars: 5
  },
];

const popularProducts = products.slice(0,2);

const Products = () => {
  return (
    <div className="flex w-full h-full space-x-10">
      <div className="flex flex-col w-full space-y-10">
        <div className="flex justify-center relative rounded-3xl h-96 overflow-hidden">
          <img src={CoverImg} className="absolute object-cover" alt="cover"/>
          <div className="flex flex-col justify-end items-start w-full p-10" style={{zIndex: "5"}}>
            <div className="text-white text-4xl w-1/2 break-words mb-5">Shoping Your Best Products!</div>
            <button className="bg-gradient-to-b from-yellow-400 to-amber-500 px-5 py-2 rounded-xl text-white text-lg hover:opacity-70">See More</button>
          </div>
        </div>
        <div className="h-full w-full bg-white rounded-3xl p-10">
          <div className="text-2xl font-semibold mb-5">Popular Products</div>
          <div className="flex justify-items-stretch space-x-5">
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
      <div className="flex flex-col w-full bg-white rounded-3xl p-10">
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
