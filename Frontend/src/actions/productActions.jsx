import axios from "axios";
import { PRODUCTS_CREATE_FAIL, PRODUCTS_CREATE_REQUEST, PRODUCTS_CREATE_SUCCESS, PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS, PRODUCTS_USER_FAIL, PRODUCTS_USER_REQUEST, PRODUCTS_USER_SUCCESS } from "../constants/productConstants"

export const listProducts = () => async(dispatch) =>{
    try{
        dispatch({type: PRODUCTS_LIST_REQUEST})

    const {data} = await axios.get("http://localhost:7000/api/products")
    dispatch({
        type : PRODUCTS_LIST_SUCCESS,
        payload : data
    })
    }catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload: message,
    })}
}

export const createProduct =(formData, images) =>
  async (dispatch, getState) => {
    try {
      const {
         title,
          description,
          price,
          discountPercentage,
          seller,
          brand,
          stock,
          ratings,
          reviews,
          category,
          isFreeDelivery,
          deliveryCharge,
          images,
          colors,
          sizes,
      } = formData
      
      dispatch({ type: PRODUCTS_CREATE_REQUEST });

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
        "http://localhost:7000/api/products/create",
        {
          title,
          description,
          price,
          discountPercentage,
          seller,
          brand,
          stock,
          ratings,
          reviews,
          category,
          isFreeDelivery,
          deliveryCharge,
          images,
          colors,
          sizes,
        },
        config
      );
      dispatch({ type: PRODUCTS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCTS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const listUserProducts = () => async(dispatch, getState) =>{
    try {
      dispatch({ type: PRODUCTS_USER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:7000/api/products/user",
        config
      );
      dispatch({ type: PRODUCTS_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCTS_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }