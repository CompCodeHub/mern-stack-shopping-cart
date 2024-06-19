import React, { useEffect } from "react";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, FetchUserCart } from "../../../state/Cart/cartAction";

const ShoppingCart = () => {
  // Get product id from route params
  const productId = useParams().productId;

  // Get search params
  const [searchParams] = useSearchParams();

  // Get quantity from search params
  const quantity = searchParams.get("quantity");

  // for dispatching actions
  const dispatch = useDispatch();

  // Get current user from store
  const user = useSelector((store) => store.userReducer.user);

  // Get current cart items from store
  const cartItems = useSelector((store) => store.cartReducer.cart.items);

  useEffect(() => {

    // if adding product to cart
    if (productId) {
      dispatch(AddToCart(productId, quantity));
    }
  }, [user]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <CartList />
        </div>
        <div className="col-md-3">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
