import * as actionTypes from "../actionTypes";

const initialState = {
  orders: [],
  loaded: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ORDERS:
      const recievedOrders = action.payload.reverse();
      return {
        ...state,
        orders: recievedOrders,
        loaded: true,
      };
    case actionTypes.PLACE_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case actionTypes.CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload
            ? { ...order, status: "CANCELLED" }
            : order
        ),
      };
    default:
      return state;
  }
};

export default orderReducer;
