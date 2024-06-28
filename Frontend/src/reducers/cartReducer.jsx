import {
  ADD_ITEM_TO_CART_FAIL,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL,
  REMOVE_ITEM_FROM_CART_REQUEST,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  UPDATE_CART_ITEM_QTY_FAIL,
  UPDATE_CART_ITEM_QTY_REQUEST,
  UPDATE_CART_ITEM_QTY_SUCCESS,
} from "../constants/filterConstants";

import { ADD_TO_CART, CHANGE_CART_QTY, REMOVE_FROM_CART } from "../constants/filterConstants";

export const cartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true };
    case ADD_ITEM_TO_CART_SUCCESS:
      const item = action.payload;
      return {
        ...state,
        loading: false,
        cart: [
          ...state.cart,
          { ...action.payload.product, quantity: action.payload.quantity },
        ],

        // cart: [...state.cart, item],
      };
    case ADD_ITEM_TO_CART_FAIL:
      return { ...state, loading: false, error: action.payload };
    case REMOVE_ITEM_FROM_CART_REQUEST:
      return { ...state, loading: true };
    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case REMOVE_ITEM_FROM_CART_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_CART_ITEM_QTY_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CART_ITEM_QTY_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: state.cart.filter((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case UPDATE_CART_ITEM_QTY_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};





export const cartReducer2 = (state={ cart : []}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case CHANGE_CART_QTY:
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    default:
      return state;
  }
};