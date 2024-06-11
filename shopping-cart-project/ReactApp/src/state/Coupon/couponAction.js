import * as actionTypes from "../actionTypes";

export const SaveCouponToStore = (coupon) => {
    return {
      type: actionTypes.SAVE_COUPON_TO_STORE,
      payload: coupon,
    };
  };