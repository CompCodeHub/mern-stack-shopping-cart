import axios from "axios";
import * as actionTypes from "../actionTypes";

export const LoadOrders = (orders) => {
  return {
    type: actionTypes.LOAD_ORDERS,
    payload: orders,
  };
};

export const CancelOrder = (orderId) => {
  return {
    type: actionTypes.CANCEL_ORDER,
    payload: orderId,
  };
};

export const PlaceOrder = (order) => {
  return {
    type: actionTypes.PLACE_ORDER,
    payload: order,
  };
};

export const FetchOrders = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/order/api/orders/${userId}`,
        { withCredentials: true }
      );
      dispatch(LoadOrders(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const CancelOrderAction = (orderId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:9000/order/api/orders/${orderId}`, {
        withCredentials: true,
      });
      dispatch(CancelOrder(orderId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const PlaceOrderAction = (order) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/order/api/orders",
        order,
        {
          withCredentials: true,
        }
      );
      dispatch(PlaceOrder(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};
