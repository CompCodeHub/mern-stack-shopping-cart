import axios from "axios";
import * as actionTypes from "../actionTypes";

export const AddToCart = (productId, quantity) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: { productId, quantity },
  };
};

export const RemoveFromCart = (productId) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: { productId },
  };
};

export const LoadUserCart = (userId, items) => {
  return {
    type: actionTypes.LOAD_USER_CART,
    payload: { userId, items },
  };
};

export const UpdateCartQuantity = (productId, quantity) => {
  return {
    type: actionTypes.UPDATE_CART_QUANTITY,
    payload: { productId, quantity },
  };
};

export const ClearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};

export const FetchUserCart = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/cart/api/cart/${userId}`,
        {
          withCredentials: true,
        }
      );
      dispatch(LoadUserCart(userId, response.data.cart.products));
    } catch (error) {
      //console.error(error);
    }
  };
};

export const SaveCartToDB = (userId, products) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/cart/api/cart",
        { userId, products },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const ClearCartFromDB = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:9000/cart/api/cart/${userId}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
