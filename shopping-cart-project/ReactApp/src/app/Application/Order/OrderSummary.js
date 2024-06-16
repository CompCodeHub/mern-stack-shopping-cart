import React from "react";
import { Link } from "react-router-dom";

const OrderSummary = (props) => {
  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <h2>Order Summary</h2>
        </li>

        <li className="list-group-item">
          <div className="row">
            <div className="col">Items</div>
            <div className="col">+ ${props.subTotal}</div>
          </div>
          <div className="row">
            <div className="col">Discount</div>
            <div className="col">
             - ${props.discountAmount}{props.discount && <>({props.discount}%)</>}
            </div>
          </div>
          <div className="row">
            <div className="col">Shipping</div>
            <div className="col">+ ${props.shipping}</div>
          </div>
          <div className="row">
            <div className="col">Taxes</div>
            <div className="col">+ ${props.tax}</div>
          </div>
          <div className="row">
            <div className="col">Total</div>
            <div className="col">${props.total}</div>
          </div>
        </li>

        {props.makePayment && (
          <li className="list-group-item">
            <Link className="btn btn-outline-dark" onClick={props.makePayment}>
              Pay Now
            </Link>
          </li>
        )}
        {props.paymentMessage && (
          <li className="list-group-item">
            <div className="alert alert-success">{props.paymentMessage}</div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default OrderSummary;