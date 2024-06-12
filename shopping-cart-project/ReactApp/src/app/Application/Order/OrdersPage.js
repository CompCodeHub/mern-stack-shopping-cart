import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CancelOrderAction,
  FetchOrders,
} from "../../../state/Order/orderAction";

const OrdersPage = () => {
  // Get access to order states
  const orders = useSelector((store) => store.orderReducer.orders);
  const ordersLoaded = useSelector((store) => store.orderReducer.loaded);

  // Get access to user state
  const user = useSelector((store) => store.userReducer.user);

  // for dispatching actions
  const dispatch = useDispatch();

  // Cancel order function
  const cancelOrder = (orderId) => {
    dispatch(CancelOrderAction(orderId));
  };

  useEffect(() => {
    if (!ordersLoaded) {
      dispatch(FetchOrders(user._id));
    }
  }, [orders]);

  return (
    <div className="container">
      <h2>Recent Orders</h2>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(order.paidAt))}
              </td>
              <td>{order.total}</td>
              <td>
                <span
                  className={`badge ${
                    order.status === "IN TRANSIT"
                      ? "bg-secondary"
                      : order.status === "CANCELLED"
                      ? "bg-danger"
                      : "bg-success"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td>
                <button
                  disabled={
                    order.status === "DELIVERED" || order.status === "CANCELLED"
                  }
                  className="btn btn-sm btn-danger"
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
