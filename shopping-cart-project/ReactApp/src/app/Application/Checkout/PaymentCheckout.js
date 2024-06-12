import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PlaceOrderAction } from "../../../state/Order/orderAction";
import { useSelector } from "react-redux";
import { ClearCart, ClearCartFromDB } from "../../../state/Cart/cartAction";

const PaymentCheckout = ({ items }) => {
  // Get search params
  const [searchParams] = useSearchParams();

  // for dispatching actions
  const dispatch = useDispatch();

  // for navigation
  const navigate = useNavigate();

  // Get user state from store
  const user = useSelector((store) => store.userReducer.user);

  // Get quantity from search params
  const discount = searchParams.get("discount");

  // state for payment message
  const [paymentMessage, setPaymentMessage] = useState(null);

  // state for shipping cost
  const [shipping, setShipping] = useState(0);

  // state for discount
  const [discountAmount, setDiscountAmount] = useState(0);

  // state for tax
  const [tax, setTax] = useState(0);

  // state for subtotal
  const [subTotal, setSubTotal] = useState(0);

  // state for total
  const [total, setTotal] = useState(0);

  // Calculates subtotal
  const calculateSubtotal = () => {
    // calculate subtotal
    const amount = items
      .reduce((acc, item) => acc + item.selectedQuantity * item.price, 0)
      .toFixed(2);

    setSubTotal(amount);
  };

  // calculate discount
  const calculateDiscount = () => {
    const amount = parseFloat((subTotal * (discount / 100)).toFixed(2));
    setDiscountAmount(amount);
  };

  // Calculates shipping
  const calculateShipping = () => {
    if (subTotal < 100) {
      const amount = parseFloat((subTotal * 0.1).toFixed(2)); // 10% of subtotal
      setShipping(amount);
    } else {
      setShipping(0);
    }
  };

  // Calculates tax
  const calculateTax = () => {
    const amount = parseFloat((subTotal * 0.08).toFixed(2));
    setTax(amount);
  };

  // Calculates final total price
  const calculateTotal = () => {
    const amount = parseFloat(
      (subTotal - discountAmount + shipping + tax).toFixed(2)
    );
    setTotal(amount);
  };

  useEffect(() => {
    calculateSubtotal();
    calculateDiscount();
    calculateShipping();
    calculateTax();
    calculateTotal();
  }, [items, subTotal, discount, shipping, tax, total]);

  // method for payment
  const makePayment = () => {
    // Set payment message
    setPaymentMessage("Payment successful!");

    // Get order items to save
    const orderItems = items.map(({ productId, selectedQuantity }) => ({
      product: productId,
      quantity: selectedQuantity,
    }));

    // Dispatch place order action
    dispatch(
      PlaceOrderAction({
        buyer: user._id,
        items: orderItems,
        shippingAddress: user.street,
        subTotal,
        discount: discountAmount,
        shipping,
        tax,
        total,
        paidAt: new Date(),
        status: "IN TRANSIT",
      })
    );

    // clear cart
    dispatch(ClearCartFromDB(user._id));
    dispatch(ClearCart())

    setTimeout(() => {
      // reset payment message
      setPaymentMessage(null);

      // navigate to orders
      navigate("/orders");
    }, 2000);
  };

  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <h2>Order Summary</h2>
        </li>

        <li className="list-group-item">
          <div className="row">
            <div className="col">Items</div>
            <div className="col">${subTotal}</div>
          </div>
          <div className="row">
            <div className="col">Discount</div>
            <div className="col">
              ${discountAmount}({discount}%)
            </div>
          </div>
          <div className="row">
            <div className="col">Shipping</div>
            <div className="col">${shipping}</div>
          </div>
          <div className="row">
            <div className="col">Taxes</div>
            <div className="col">${tax}</div>
          </div>
          <div className="row">
            <div className="col">Total</div>
            <div className="col">${total}</div>
          </div>
        </li>

        <li className="list-group-item">
          <Link className="btn btn-outline-dark" onClick={makePayment}>
            Pay Now
          </Link>
        </li>
        {paymentMessage && (
          <li className="list-group-item">
            <div className="alert alert-success">{paymentMessage}</div>
          </li>
        )}
      </ul>
    </div>
  );
};
export default PaymentCheckout;
