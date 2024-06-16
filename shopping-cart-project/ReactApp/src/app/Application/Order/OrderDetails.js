import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import ReviewProduct from "../Review/ReviewProduct";

const OrderDetails = () => {
  // Get order id from params
  const params = useParams();
  const orderId = params["id"];

  // Get access to orders
  const orders = useSelector((store) => store.orderReducer.orders);

  // state for current order
  const [order, setOrder] = React.useState({});

  useEffect(() => {
    // Find the order with the given id
    const currentOrder = orders.find((order) => order._id === orderId);
    setOrder(currentOrder);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <h2>Products Purchased</h2>
            <ReviewProduct order={order} />
        </div>
        <div className="col-md-3">
          <OrderSummary
            subTotal={order.subTotal}
            discountAmount={order.discount}
            shipping={order.shipping}
            tax={order.tax}
            total={order.total}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
