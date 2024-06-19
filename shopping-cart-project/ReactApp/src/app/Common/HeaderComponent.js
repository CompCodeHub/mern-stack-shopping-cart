import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; //replacement of mapStateToProp
import {
  LoadNotificationsFromDB,
  RemoveNotificationByUrl,
  RemoveNotificationFromDB,
} from "../../state/Notification/notificationAction";
import { FetchUserCart } from "../../state/Cart/cartAction";
import { FetchOrders } from "../../state/Order/orderAction";

let Header = (props) => {
  //allows us to read data from store/reducer as we do with mapStateToProps
  //becomes subscriber of user state from user reducer
  const user = useSelector((store) => store.userReducer.user);

  // for navigation
  const navigate = useNavigate();

  // state for new notification
  const [newNotification, setNewNotification] = useState(false);

  // ref for notification dropdown
  const notificationRef = useRef(null);

  // for dispatching actions
  const dispatch = useDispatch();

  // get access to store cart
  const cartItems = useSelector((store) => store.cartReducer.cart.items);

  // get access to store notifications
  const notifications = useSelector(
    (store) => store.notificationReducer.notifications
  );

  const usrName = user && user.userName ? user.userName : props.userName;

  useEffect(() => {
    if (user && user._id) {
      dispatch(FetchOrders(user._id))
      dispatch(FetchUserCart(user._id));
      setTimeout(() => {
        dispatch(LoadNotificationsFromDB(user._id));
      }, 1000)
    }
  }, [user]);

  useEffect(() => {
    if (notifications.length > 0 && notificationRef.current) {
      setNewNotification(true);
      // Open the dropdown programmatically
      let dropdown = new bootstrap.Dropdown(notificationRef.current);
      dropdown.show();
      // Reset the new notification state after some time
      setTimeout(() => {
        dropdown.hide();
        setNewNotification(false);
      }, 2000);
    }
  }, [notifications]);

  // handle clicking of notification
  const notificationClickHandler = (notification) => {
    if (notification._id) {
      dispatch(RemoveNotificationFromDB(notification.url));
    } else {
      dispatch(RemoveNotificationByUrl(notification.url));
    }

    navigate(`/${notification.url}`);
  };

  return (
    <>
      <h2>
        Hi {usrName} , Welcome to Shopping Cart sponsored by Tech Team SIT
      </h2>

      <div className="row">
        <div className="col">
          <NavLink to="/home" className="button" activeclassname="true">
            {" "}
            Home{" "}
          </NavLink>
          <NavLink to="/user" className="button" activeclassname="true">
            {" "}
            Login{" "}
          </NavLink>
          <NavLink to="/about" className="button" activeclassname="true">
            {" "}
            About{" "}
          </NavLink>
          {user._id && (
            <>
              <NavLink to="/hobbies" className="button" activeclassname="true">
                {" "}
                Hobbies{" "}
              </NavLink>
              <NavLink to="/products" className="button" activeclassname="true">
                {" "}
                Products{" "}
              </NavLink>
              <NavLink to="/coupons" className="button" activeclassname="true">
                {" "}
                Coupons{" "}
              </NavLink>{" "}
              <NavLink to="/orders" className="button" activeclassname="true">
                {" "}
                My Orders{" "}
              </NavLink>{" "}
            </>
          )}
        </div>

        {user._id && (
          <div className="col text-end me-5 d-flex justify-content-end align-items-center">
            <div className="dropdown me-4">
              <i
                className="bi bi-bell position-relative dropdown-toggle"
                id="notificationDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                role="button"
                ref={notificationRef}
                style={{ fontSize: "1.5rem" }}
              ></i>
              {notifications.length > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                  {notifications.length}
                </span>
              )}
              <ul
                className="dropdown-menu"
                aria-labelledby="notificationDropdown"
              >
                {notifications.length === 0 ? (
                  <li className="dropdown-item">
                    You don't have any notifications
                  </li>
                ) : (
                  notifications.map((notification, index) => (
                    <li
                      className="dropdown-item"
                      key={index}
                      onClick={() => notificationClickHandler(notification)}
                    >
                      {notification.message}
                    </li>
                  ))
                )}
              </ul>
            </div>

            <NavLink
              to="/cart"
              className="btn btn-lg btn-outline-primary position-relative"
              activeclassname="true"
            >
              {" "}
              Cart <i className="bi bi-cart3"></i>{" "}
              {cartItems.length > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 rounded-pill translate-middle">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          </div>
        )}

        {/* <NavLink to="/about/2500"  className="button" activeclassname="true"> About with Param</NavLink> */}
      </div>
      <hr />
    </>
  );
};

export default Header;
