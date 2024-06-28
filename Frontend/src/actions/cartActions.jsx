import axios from "axios";
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

export const addToCart =
  (product, quantity) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:7000/api/cart/add-item",
        { product, quantity },
        config
      );

      dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
      
    } catch (error) {
      dispatch({
        type: ADD_ITEM_TO_CART_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const removeItemFromCart = (itemId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_ITEM_FROM_CART_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://localhost:7000/api/cart/${itemId}`, config);

    dispatch({ type: REMOVE_ITEM_FROM_CART_SUCCESS, payload: itemId });
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_FROM_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCartItemQty =
  (itemId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_CART_ITEM_QTY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:7000/api/cart/${itemId}`,
        { quantity },
        config
      );

      dispatch({ type: UPDATE_CART_ITEM_QTY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_CART_ITEM_QTY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
