import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FetchProducts } from "../../../state/Product/productAction";
import {
  ClearCartFromDB,
  RemoveFromCart,
  SaveCartToDB,
  UpdateCartQuantity,
} from "../../../state/Cart/cartAction";

const CartList = () => {
  // Get access to cart items from the store
  const items = useSelector((store) => store.cartReducer.cart.items);

  // Get current user from store
  const user = useSelector((store) => store.userReducer.user);

  // State for cart items
  const [cartItems, setCartItems] = useState([]);

  // Get access to products from store
  const products = useSelector((store) => store.productReducer.products);

  // For dispatching actions
  const dispatch = useDispatch();

  // Function to map current cart items to products
  const mapCartItemsToProducts = () => {
    if (products.length > 0) {
      const newCartItems = items.map((item) => {
        const product = products.find(
          (product) => product._id === item.product
        );
        if (product) {
          return {
            productId: product._id,
            name: product.name,
            price: product.price,
            selectdQuantity: item.quantity,
            productQuantity: product.quantity,
            image: product.image.url,
          };
        }
      });

      // Update cartItems state
      setCartItems(newCartItems);
    }
  };

  useEffect(() => {
    // Fetch products if not available
    if (products.length === 0) {
      dispatch(FetchProducts());
    } else {
      // Map cart items to products
      mapCartItemsToProducts();
    }
  }, [items, products, dispatch]);

  useEffect(() => {
    // Map cart items to products whenever items or products change
    mapCartItemsToProducts();
  }, [items, products]);

  const saveCart = () => {
    if (items.length === 0) {
      dispatch(ClearCartFromDB(user._id));
    } else {
      dispatch(SaveCartToDB(user._id, items));
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h2>Your Cart</h2>
        </div>
        <div className="col-md-6">
          <Link
            className="btn btn-outline-dark float-end"
            onClick={saveCart}
          >
            Save Cart
          </Link>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty.{" "}
          <Link
            to={"/products"}
            className="alert-link text-decoration-underline"
          >
            Go Back
          </Link>
        </div>
      ) : (
        <ul className="list-group list-group-flush">
          {cartItems.map((item) => (
            <li className="list-group-item" key={item.productId}>
              <div className="row">
                <div className="col-md-2">
                  <img className="img-fluid rounded" src={item.image} />
                </div>
                <div className="col-md-3 text-dark">
                  <Link to={`/products/1`} className="text-dark">
                    {item.name}
                  </Link>
                </div>
                <div className="col-md-2">
                  <p>Price: ${item.price}</p>
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    defaultValue={item.selectdQuantity}
                    max={item.productQuantity}
                    min={1}
                    onChange={(e) =>
                      dispatch(
                        UpdateCartQuantity(
                          item.productId,
                          Number(e.target.value)
                        )
                      )
                    }
                  />
                </div>
                <div className="col-md-2">
                  <Link
                    className="btn btn-outline-dark"
                    onClick={() => dispatch(RemoveFromCart(item.productId))}
                  >
                    <i className="bi bi-trash"></i>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
