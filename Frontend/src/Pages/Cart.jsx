import React, { useEffect, useState } from "react";
import { FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, updateCartItemQty } from "../actions/cartActions";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const Cart = () => {
  const dispatch = useDispatch()
  const cartList = useSelector((state) => state.cartList);
  const { cart, loading, error } = cartList;
  const [total,setTotal] = useState();
  const [totalActualPrice,setTotalActualPrice]= useState()
  const [totalDiscountPercent,setTotalDiscountPercent] = useState()

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.discountPrice)*curr.qty, 0)
    )
    setTotalActualPrice(
      cart.reduce((acc,curr)=> acc + Number(curr.price)*curr.qty , 0 )
    )
    setTotalDiscountPercent(
      cart.reduce((acc, curr) => acc + Number(curr.discountPercentage) * curr.qty, 0)
    );
  },[cart,dispatch])

  return (
    <div className="space-y-3 space-x-5 flex justify-between  items-start shadow-sm bg-gray-50/45 my-20 px-24 *:p-3  rounded">
      <div className="space-y-2 flex-grow">
      {loading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
        {cart.map((prod) => (
          <div className="flex bg-white text-gray-600 p-3 border rounded ">
            <div className="w-[10vw]  overflow-hidden ">
              <img
                src={prod.images[0]}
                className="object-cover h-full object-center"
              />
            </div>
            <div className="w-full px-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline divide-x-2 ">
                  <div className="text-xl mr-2">{prod.title}</div>
                  <div className="px-2">{prod.category}</div>
                </div>
                <button
                onClick={removeItemFromCart(prod._id,prod.qty)}
                 className="text-red-500">Remove</button>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-lg">${prod.discountPrice}</span>
                <s>${prod.price}</s>
                <span className="text-green-600">
                  {prod.discountPercentage}% off
                </span>
              </div>

              <FormControl
                as="select"
                value={prod.qty}
                onChange={(e) => {updateCartItemQty(prod._id, e.target.value)}
                  // dispatch({
                  //   type: CHANGE_CART_QTY,
                  //   payload:{
                  //     _id : prod._id,
                  //     qty : e.target.value

                  //   },
                    
                  // })
                }
                className="bg-slate-50 w-14  rounded  focus:outline-none focus:ring-4 focus:ring-indigo-300  "
              >
                {[...Array(prod.stock).keys()].map((x) => (
                  <option key={x + 1} className="bg-white p-2">
                    {x + 1}
                  </option>
                ))}
              </FormControl>
              <span className=" align-bottom px-2">Qty</span>

              <p className="truncate">{prod.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[25vw] *:py-2 shadow  bg-gray-100/45 text-slate-800  rounded">
        <h3 className="font-semibold text-lg">Price Details ({cart.length} items)</h3>
        <div className="">
          Total Product Price
          <span className="float-right mr-4"> {totalActualPrice} </span>
        </div>
        <div className="text-green-600">
          Total Discount
          <span className="float-right mr-4"> {totalDiscountPercent}%</span>
        </div>
          
        <div className="font-semibold border-t-2 text-lg ">
          Subtotal <span className="float-right mr-4"> $ {total}</span>
        </div>

        <div className="bg-green-500 hover:bg-green-600 p-2 text-center font-semibold text-white rounded">
          <button disabled={cart.length ===0} className="">Procedd to checkout</button>
        </div>
        <div className="text-center">
          {" "}
          or
          <Link to={"/"} className="hover:underline text-blue-700 ">
            {" "}
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
