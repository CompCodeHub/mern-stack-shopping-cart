import * as actionTypes from "../actionTypes";

export const SaveCouponToStore = (couponValue) => {
    return {
      type: actionTypes.SAVE_COUPON_TO_STORE,
      payload: couponValue,
    };
  };