import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchProducts } from "../../../state/Product/productAction";
import ReviewRating from "./ReviewRating";
import axios from "axios";

const ReviewProduct = (props) => {
  // For dispatching actions
  const dispatch = useDispatch();

  // Get access to user in store
  const user = useSelector((store) => store.userReducer.user);

  // Get access to products in store
  const products = useSelector((store) => store.productReducer.products);

  // state for review products
  const [reviewProducts, setReviewProducts] = useState([]);

  // State for ratings and reviews
  const [productRatings, setProductRatings] = useState({});
  const [productReviews, setProductReviews] = useState({});

  // state for review message
  const [reviewMessage, setReviewMessage] = useState(null);

  const handleRating = (productId, rating) => {
    setProductRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };

  const handleReviewText = (productId, text) => {
    setProductReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: text,
    }));
  };

  const submitReview = async (productId) => {
    // Submit review
    try {
      await axios.post(
        `http://localhost:9000/review/api/reviews/`,
        {
          user: user._id,
          rating: productRatings[productId],
          comment: productReviews[productId],
          product: productId,
          name: user.userName,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to submit review", error);
    }

    setReviewMessage("Review submitted successfully!");
    setTimeout(() => {
      setReviewMessage(null);
    }, 1000);
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(FetchProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    // Fetch products if not available
    if (products.length > 0 && props.order.items) {
      // map products from order items
      const productsToReview = props.order.items.map((item) => {
        return products.find((product) => product._id === item.product);
      });

      // set review products
      setReviewProducts(productsToReview);

      // Fetch reviews for each product
      const fetchReviews = async () => {
        const initialRatings = {};
        const initialReviews = {};
        await Promise.all(
          productsToReview.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:9000/review/api/reviews/${product._id}/${user._id}`,
                {
                  withCredentials: true,
                }
              );
              const { rating, comment } = response.data;
              initialRatings[product._id] = rating || 0; // Default rating if none found
              initialReviews[product._id] = comment || ""; // Default review text if none found
            } catch (error) {
              initialRatings[product._id] = 0; // Default rating in case of error
              initialReviews[product._id] = ""; // Default review text in case of error
            }
          })
        );
        setProductRatings(initialRatings);
        setProductReviews(initialReviews);
      };

      fetchReviews();
    }
  }, [products, props.order.items]);

  return (
    <>
      {reviewMessage && (
        <div className="alert alert-success mt-2">{reviewMessage}</div>
      )}
      <ul className="list-group list-group-flush">
        {reviewProducts.length > 0 &&
          reviewProducts.map((product) => (
            <li className="list-group-item" key={product._id}>
              <div className="row">
                <div className="col-md-2">
                  <img className="img-fluid rounded" src={product.image.url} />
                </div>
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-9">
                      <h3>{product.name}</h3>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-outline-dark"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => submitReview(product._id)}
                      >
                        Submit Rating
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    Rate this product:{" "}
                    <ReviewRating
                      onRate={(rating) => handleRating(product._id, rating)}
                      initialRating={productRatings[product._id]}
                    />
                  </div>
                  <div className="row">
                    <textarea
                      type="text"
                      placeholder="Add a review"
                      className="form-control"
                      rows={3}
                      value={productReviews[product._id]}
                      onChange={(e) =>
                        handleReviewText(product._id, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
export default ReviewProduct;
