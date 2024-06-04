import React, { useEffect, useState } from "react";
import UserCheckoutDetails from "./UserCheckoutDetails";
import PaymentCheckout from "./PaymentCheckout";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  // Get access to cart
  const items = useSelector((store) => store.cartReducer.cart.items);

  // Get access to products from store
  const products = useSelector((store) => store.productReducer.products);

  // state for mapped cart items
  const [cartItems, setCartItems] = useState([]);

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
            selectedQuantity: item.quantity,
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
    mapCartItemsToProducts();
  }, [items, products]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <UserCheckoutDetails items={cartItems} />
        </div>
        <div className="col-md-3">
          <PaymentCheckout items={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
