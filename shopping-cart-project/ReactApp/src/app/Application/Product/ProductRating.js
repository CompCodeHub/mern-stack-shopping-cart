import React from "react";

// Responsible for rendering rating stars on product card
const ProductRating = (props) => {
  return (
    <React.Fragment>
      <span>
        <i
          className={
            props.rating >= 1
              ? "bi bi-star-fill"
              : props.rating >= 0.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          style={{ color: "gold", fontSize: "1.5rem" }}
        ></i>
      </span>
      <span>
        <i
          className={
            props.rating >= 2
              ? "bi bi-star-fill"
              : props.rating >= 1.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          style={{ color: "gold", fontSize: "1.5rem" }}
        ></i>
      </span>
      <span>
        <i
          className={
            props.rating >= 3
              ? "bi bi-star-fill"
              : props.rating >= 2.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          style={{ color: "gold", fontSize: "1.5rem" }}
        ></i>
      </span>
      <span>
        <i
          className={
            props.rating >= 4
              ? "bi bi-star-fill"
              : props.rating >= 3.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          style={{ color: "gold", fontSize: "1.5rem" }}
        ></i>
      </span>
      <span>
        <i
          className={
            props.rating >= 5
              ? "bi bi-star-fill"
              : props.rating >= 4.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          style={{ color: "gold", fontSize: "1.5rem" }}
        ></i>
      </span>
    </React.Fragment>
  );
};

export default ProductRating;
