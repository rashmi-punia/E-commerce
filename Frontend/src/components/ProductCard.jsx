import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CLEAR_FILTERS,
 
} from "../constants/filterConstants";
import SortPop from "./Sort";
import RenderProducts from "./RenderProducts";

const ProductCard = () => {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(listProducts());
  // }, [dispatch]);

  // const productList = useSelector((state) => state.productList);
  // const { loading, error, productArray } = productList;

  // const cartList = useSelector((state) => state.cartList);
  // const { cart } = cartList;

  // const filterState = useSelector((state) => state.filterState);
  // const { byFreeDelivery, byRating, sort, searchQuery, byDiscount } =
  //   filterState;


  // if (!productArray) {
  //   return <div>Loading.......</div>;
  // }

  // const transformProducts = () => {
  //   if (!productArray || productArray.length === 0) {
  //     console.log("Product array is empty or undefined");
  //     return [];
  //   }
  //   let sortedProducts = [...productArray];
  //   console.log("initial : ", sortedProducts);

  //   if (sort) {
  //     sortedProducts = sortedProducts.sort((a, b) =>
  //       sort === "lowToHigh"
  //         ? a.discountPrice - b.discountPrice
  //         : b.discountPrice - a.discountPrice
  //     );
  //   }

  //   if (byDiscount) {
  //     sortedProducts = sortedProducts.sort(
  //       (a, b) => b.discountPercentage - a.discountPercentage
  //     );
  //   }

  //   if (byFreeDelivery) {
  //     sortedProducts = sortedProducts.filter(
  //       (product) => product.isFreeDelivery
  //     );
  //   }

  //   if (searchQuery) {
  //     sortedProducts = sortedProducts.filter((product) =>
  //       product.title.toLowerCase().includes(searchQuery)
  //     );
  //   }
  //   console.log(sortedProducts);
  //   return sortedProducts;
  // };

  return (
    <div className="flex justify-center  my-12 space-x-4 ">
      <div className="w-[23vw] px-3 mt-3 py-2 sticky top-4 left-0 h-screen *:py-2 border rounded text-slate-700">
      <div className="flex justify-between">
        <span className="text-2xl">Filter Products</span>
      </div>
        <hr />
        <SortPop />
        <p>next</p>

      </div>


      <RenderProducts />
    </div>
  );
};

export default ProductCard;

