import { tr } from "@faker-js/faker";
import {
  // ADD_TO_CART,
  // CHANGE_CART_QTY,
  CLEAR_FILTERS,
  FILTER_BY_DELIVERY,
  FILTER_BY_DISCOUNT,
  FILTER_BY_RATING,
  FILTER_BY_SEARCH,
  FILTER_BY_STOCK,
  // REMOVE_FROM_CART,
  SORT_BY_PRICE,
} from "../constants/filterConstants";
import {
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_CREATE_REQUEST,
  PRODUCTS_CREATE_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
} from "../constants/productConstants";

const initialState = {
  productArray: [],
  loading: false,
  error: null,
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return { loading: true };
    case PRODUCTS_LIST_SUCCESS:
      return { loading: false, productArray: action.payload };
    case PRODUCTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_CREATE_REQUEST:
      return { loading: true };
    case PRODUCTS_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCTS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const productListUserReducer = 

export const filterProductReducer = (
  state = {
    byStock: false,
    byFreeDelivery: false,
    byRating: 0,
    searchQuery: "",
    byDiscount: false,
  },
  action
) => {
  switch (action.type) {
    case SORT_BY_PRICE:
      return { ...state, sort: action.payload };
    case FILTER_BY_STOCK:
      return { ...state, byStock: !state.byStock };
    case FILTER_BY_DELIVERY:
      return { ...state, byFreeDelivery: !state.byFreeDelivery };
    case FILTER_BY_RATING:
      return { ...state, byRating: action.payload };
    case FILTER_BY_SEARCH:
      return { ...state, searchQuery: action.payload };
    case FILTER_BY_DISCOUNT:
      return { ...state, byDiscount: !state.byDiscount };
    case CLEAR_FILTERS:
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
        byDiscount: false,
      };
    default:
      return state;
  }
};
