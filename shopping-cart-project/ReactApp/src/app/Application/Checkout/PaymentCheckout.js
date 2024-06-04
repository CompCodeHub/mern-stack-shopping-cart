import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PaymentCheckout = ({ items }) => {
  useEffect(() => {
    console.log(items);
    if(!items.totalPrice) {
      
    }
  }, [items]);

  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <h2>Order Summary</h2>
        </li>

        <li className="list-group-item">
          <div className="row">
            <div className="col">Items</div>
            <div className="col">
              $
              {items
                .reduce(
                  (acc, item) => acc + item.selectedQuantity * item.price,
                  0
                )
                .toFixed(2)}
            </div>
          </div>
          <div className="row">
            <div className="col">Shipping</div>
            <div className="col">$0.00</div>
          </div>
          <div className="row">
            <div className="col">Taxes</div>
            <div className="col">$0.00</div>
          </div>
          <div className="row">
            <div className="col">Total</div>
            <div className="col">
              $
              {items
                .reduce(
                  (acc, item) => acc + item.selectedQuantity * item.price,
                  0
                )
                .toFixed(2)}
            </div>
          </div>
        </li>

        <li className="list-group-item">
          <Link className="btn btn-outline-dark">Pay Now</Link>
        </li>
      </ul>
    </div>
  );
};
export default PaymentCheckout;
