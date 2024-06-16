import React, { useState, useEffect } from "react";

const ReviewRating = ({ onRate, initialRating }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRating = (rate) => {
    setRating(rate);
    onRate(rate);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ cursor: "pointer" }}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <i
            className={`bi ${
              star <= (hoverRating || rating) ? "bi-star-fill" : "bi-star"
            }`}
            style={{
              color: star <= (hoverRating || rating) ? "gold" : "gray",
              fontSize: "1.5rem",
            }}
          ></i>
        </span>
      ))}
    </div>
  );
};

export default ReviewRating;
