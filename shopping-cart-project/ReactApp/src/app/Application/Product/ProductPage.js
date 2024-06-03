import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ProductPage = () => {
  // Get products from store
  const products = useSelector((store) => store.productReducer.products);

  // Get product id from params
  const params = useParams();
  const productId = params["id"];

  // Local state for product details
  const [product, setProduct] = useState(null);

  // local state for quantity selection
  const [quantity, setQuantity] = useState(1);

  // for navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Find and set product details
    setProduct(products.find((p) => p._id == productId));
  }, [product, productId]);


  // Handles adding to cart
  const addToCartHandler = () => {
      navigate(`/cart/${productId}?quantity=${quantity}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-auto">
          <Link to="/products" className="btn btn-outline-dark">
            Back
          </Link>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-6">
          {product && (
            <img
              src={product.image.url}
              alt="product"
              className="w-100 h-100 rounded border border-dark"
            />
          )}
        </div>
        <div className="col-md-6">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h2>{product && product.name}</h2>
            </li>
            <li className="list-group-item">
              <h4>Description: {product && product.description}</h4>
            </li>
            <li className="list-group-item">
              Price: ${product && product.price}
            </li>
            <li className="list-group-item">
              Quantity:{" "}
              <select className="form-select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                {product &&
                  Array.from({ length: product.quantity }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
              </select>
            </li>
            <li className="list-group-item">
              <a className="btn btn-outline-dark" onClick={addToCartHandler}>Add to Cart</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
