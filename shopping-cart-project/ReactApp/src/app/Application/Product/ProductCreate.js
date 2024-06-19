import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SaveProductToDB } from "../../../state/Product/productAction";
import { AddNotification } from "../../../state/Notification/notificationAction";
import { useSelector } from "react-redux";

const ProductCreate = () => {
  // for navigation
  const navigate = useNavigate();

  // for dispatching actions to store
  const dispatch = useDispatch();

  // Get access to user from store
  const user = useSelector((store) => store.userReducer.user);

  // Local states for form
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  // converts image to base64
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!name || !price || !description || !category || !image) {
      setError("Please fill all the fields");
    } else {
      // set random id
      // set random rating
      const rating = Math.floor(Math.random() * 5) + 1;

      // Set product values
      const product = {
        name,
        price,
        description,
        category,
        image,
        rating,
        quantity,
      };

      // dispatch action to save product to DB
      dispatch(SaveProductToDB(product));

      // Create notification
      const notification = {
        message: `Product ${name} created successfully`,
        url: "products",
        user: user._id,
      };

      // dispatch add notification
      dispatch(AddNotification(notification));

      // navigate to products page
      navigate("/products");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Create Product</h2>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control-sm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control-sm"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>General</option>
                <option>Electronics</option>
                <option>Home Decor</option>
                <option>Clothes</option>
                <option>Food</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Image</label>
              <input
                type="file"
                className="form-control-sm"
                onChange={(e) => convertToBase64(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control-sm"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => navigate("/products")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
