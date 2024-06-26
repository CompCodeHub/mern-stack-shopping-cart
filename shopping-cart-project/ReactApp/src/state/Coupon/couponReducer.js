import * as actionTypes from "../actionTypes";

const initialState = {
  coupon: {
    code: "",
    discount: 0
  },
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_COUPON_TO_STORE:
        const coupon = action.payload;
        return { ...state, coupon };
    default:
      return state;
  }
};

export default couponReducer;