import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductRating from "../Product/ProductRating";
import axios from "axios";

const Review = () => {
  // Get product id from params
  const params = useParams();
  const productId = params.id;

  // state for reviews
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews when the component mounts
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/review/api/reviews/${productId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div className="container">
      <div className="mb-4">
        <Link to={`/products/${productId}`} className="btn btn-outline-dark">
          Back
        </Link>
      </div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <div className="alert alert-info">
          No reviews available for this product
        </div>
      ) : (
        <ul className="list-group list-group-flush">{
          reviews.map((review) => (
            <li key={review._id} className="list-group-item">
              <strong>{review.name}</strong>
              <ProductRating rating={review.rating} />
              <p>{review.comment}</p>
            </li>
          ))
        }</ul>
      )}
    </div>
  );
};

export default Review;
