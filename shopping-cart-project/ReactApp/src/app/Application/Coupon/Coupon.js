import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveCouponToStore } from "../../../state/Coupon/couponAction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Coupon = () => {
  // Get cart items from store
  const cartItems = useSelector((store) => store.cartReducer.cart.items);

  // Get coupon from store
  const coupon = useSelector((store) => store.couponReducer.coupon);

  // For navigation
  const navigate = useNavigate();

  // for dispatching actions
  const dispatch = useDispatch();

  // Generates a random discount value
  const generateRandomDiscount = (min = 10, max = 50) => {
    // Generate a random number between min and max (inclusive)
    const discount = Math.floor(Math.random() * (max - min + 1)) + min;
    return discount;
  };

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
    const discount = generateRandomDiscount();
    const coupon = { code: result, discount };
    dispatch(SaveCouponToStore(coupon));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 mx-auto">
          <div className="card text-center m-3">
            <div className="card-header">Generate your coupon</div>
            <div className="card-body">
              <form>
                <div className="form-label">Your unique coupon code:</div>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={coupon.code}
                  readOnly={true}
                />
                <button
                  className="btn btn-outline-dark mt-3 me-2"
                  onClick={generateRandomCoupon}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  Generate
                </button>
                <button
                  disabled={cartItems.length === 0 || coupon.code === ""}
                  onClick={() =>
                    navigate(`/checkout?discount=${coupon.discount}`)
                  }
                  className="btn btn-outline-dark mt-3"
                >
                  Apply Coupon
                </button>
              </form>
            </div>
            <div className="card-footer text-muted">
              Please add items to cart to apply the coupon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
