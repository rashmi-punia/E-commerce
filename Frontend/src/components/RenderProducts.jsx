import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsFillStarFill } from "react-icons/bs";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { addToCart, removeItemFromCart } from "../actions/cartActions";


const RenderProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, productArray } = productList;

  const cartList = useSelector((state) => state.cartList);
  const { cart } = cartList;

  const filterState = useSelector((state) => state.filterState);
  const { byFreeDelivery, byRating, sort, searchQuery, byDiscount } =
    filterState;

    const sanitizeImageUrl = (url) => {
      return url.replace(/\\/g, "/");
    };



  const transformProducts = () => {
    if (!productArray || productArray.length === 0) {
      console.log("Product array is empty or undefined");
      return [];
    }
    let sortedProducts = [...productArray];

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh"
          ? a.discountPrice - b.discountPrice
          : b.discountPrice - a.discountPrice
      );
    }

    if (byDiscount) {
      sortedProducts = sortedProducts.sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
    }

    if (byFreeDelivery) {
      sortedProducts = sortedProducts.filter(
        (product) => product.isFreeDelivery
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      );
    }
    sortedProducts = sortedProducts.map(product => ({
      ...product, images: product.images.map(sanitizeImageUrl)
    }))
    console.log(sortedProducts);
    return sortedProducts;
  };

  return (
    <>
      <div className="w-[70vw] space-y-3 grid grid-cols-4 items-baseline ">
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {transformProducts().map((product) => (
          <Link
            key={product._id}
            className="group border  rounded-lg overflow-hidden w-[16vw]"
          >
            <div className="h-[35vh] relative overflow-hidden flex items-center justify-center">
              <img
                src={product.images[0]}
                className="object-cover relative h-full w-full object-center group-hover:opacity-85"
              />
              {product.stock ? (
                <span className="bg-gray-100 p-1.5 text-xs rounded-tl-xl absolute bottom-0 right-0">
                  +{product.stock} More
                </span>
              ) : (
                <span className="bg-indigo-400 text-white p-1.5 text-xs rounded-tl-xl absolute bottom-0 right-0">
                  Out of stock
                </span>
              )}
            </div>
            <motion.div whileHover={{ y: -5 }} className="p-2 bg-white">
              <div className="bg-sky-400 text-white w-fit text-sm px-2 rounded-full">
                {product.category}
              </div>
              <div className="text-slate-600 text-nowrap truncate mr-3 text-xl">
                {product.title}
              </div>
              <div>{product.brand}</div>
              <div className="space-x-2">
                <span className="text-xl">${product.discountPrice}</span>
                <s>${product.price}</s>
                <span className="text-green-600 text-lg">
                  {product.discountPercentage} %
                </span>
                <p>{product.id}</p>
              </div>
              <div className="bg-gray-100 rounded-2xl my-1 text-sm w-fit px-2">
                {product.isFreeDelivery
                  ? "FreeDelivery"
                  : product.deliveryCharge + "$"}
              </div>
              <span className="bg-green-500 text-white px-2 rounded-2xl">
                {product.ratings}{" "}
                <BsFillStarFill className="inline-flex align-baseline size-3 text-white" />{" "}
              </span>
              <span className="text-xs mx-2"> {product.reviews} Reviews</span>

              <div className="flex space-x-2 mt-1.5">
                {cart.find((item) => item._id === product._id) ? (
                  <button
                    onClick={() => dispatch(removeItemFromCart(product._id))}
                  
                    className="text-white  px-1 hover:bg-opacity-75 rounded bg-red-500"
                  >
                    Remove from cart
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => dispatch(addToCart(product, 1))}
                  
                      disabled={!product.stock}
                      className="text-white  disabled:opacity-50 px-1 hover:bg-opacity-75 rounded bg-blue-500"
                    >
                      Add to cart
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RenderProducts;
