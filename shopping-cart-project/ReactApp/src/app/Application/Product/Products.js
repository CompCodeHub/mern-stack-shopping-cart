import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchProducts } from "../../../state/Product/productAction";
import { useNavigate, Link } from "react-router-dom";

const Products = () => {
  // Get products from the store
  const products = useSelector((store) => store.productReducer.products);

  // for navigation
  const navigate = useNavigate();

  // Get dispatch function
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchProducts());
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2>Products</h2>
        </div>
        <div className="col-6 text-end">
          <a
            onClick={() => navigate("/products/create")}
            className="btn btn-primary"
          >
            Create Product
          </a>
        </div>
      </div>
      <div className="row mb-4">
        {products ? (
          products.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <div className="card h-100" style={{ maxWidth: "16rem" }}>
                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.image.url}
                    className="card-img-top"
                    alt="product"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </Link>

                <div className="card-body">
                  <Link to={`/products/${product._id}`} className="text-dark">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Price: ${product.price}</p>
                  </Link>
                  <a onClick={() => navigate(`/cart/${product._id}?quantity=1`)} className="btn btn-primary mt-4">
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4>Loading...</h4>
        )}
      </div>
    </div>
  );
};

export default Products;
