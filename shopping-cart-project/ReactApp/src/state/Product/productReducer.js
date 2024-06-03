import * as actionTypes from "../actionTypes";

let initialState = {
  products: [],
};

let productReducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.ADD_PRODUCTS_TO_STORE:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.SAVE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
};

export default productReducer;
