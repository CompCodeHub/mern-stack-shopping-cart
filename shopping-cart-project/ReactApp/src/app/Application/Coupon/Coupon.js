import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveCouponToStore } from "../../../state/Coupon/couponAction";

const Coupon = () => {
  // Get coupon from store
  const coupon = useSelector((store) => store.couponReducer.coupon);

  // for dispatching actions
  const dispatch = useDispatch();

  // generating random coupon
  const generateRandomCoupon = (evt) => {
    evt.preventDefault();
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    dispatch(SaveCouponToStore(result));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 mx-auto">
          <div className="card text-center m-3">
            <div className="card-header">Generate your coupon</div>
            <div className="card-body">
              <form>
                <div className="form-label">Your unique coupon code:</div>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={coupon}
                  readOnly={true}
                />
                <div
                  className="btn btn-outline-dark mt-3 me-2"
                  onClick={generateRandomCoupon}
                >
                  Generate
                </div>
                <div className="btn btn-outline-dark mt-3">Apply Coupon</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
