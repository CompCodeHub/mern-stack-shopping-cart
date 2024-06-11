import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const UserCheckoutDetails = ({ items }) => {
  // Get access to user from store
  const user = useSelector((store) => store.userReducer.user);

  // Get access to cart from store
  const cart = useSelector((store) => store.cartReducer.cart);

  useEffect(() => {
  }, [user, items]);

  return (
    <div>
      <h2>Shipping Details</h2>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <p>
            <strong>Name:</strong> {user.userName}
          </p>
          <p>
            <strong>Contact:</strong> {user.mobile}
          </p>
          <p>
            <strong>Address:</strong> {user.street}
          </p>
          <div className="alert alert-primary">
            <i className="bi bi-info-circle"></i> Your order will be delivered
            to the above address.
          </div>
        </li>
        <li className="list-group-item">
          <ul className="list-group list-group-flush">
            {items.length > 0 &&
              items.map((item) => (
                <li
                  key={item.productId}
                  className="list-group-item"
                >
                  <div className="row">
                    <div className="col-md-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col">{item.name}</div>
                    <div className="col-md-4">
                      {item.selectedQuantity} x ${item.price} = $
                      {(item.selectedQuantity * item.price).toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default UserCheckoutDetails;
