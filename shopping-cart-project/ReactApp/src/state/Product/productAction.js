import * as actionTypes from "../actionTypes";
import axios from "axios";

export const AddProductsToStore = (products) => {
  return {
    type: actionTypes.ADD_PRODUCTS_TO_STORE,
    payload: products,
  };
};

export const SaveProduct = (product) => {
  return {
    type: actionTypes.SAVE_PRODUCT,
    payload: product,
  };
};

export const FetchProducts = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:9000/product/api/products", {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(AddProductsToStore(response.data));
      })
      .catch((err) => console.log(err));
  };
};

export const SaveProductToDB = (product) => {
  return (dispatch) => {
    axios
      .post("http://localhost:9000/product/api/products", product, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(SaveProduct(response.data.product));
      })
      .catch((err) => console.log(err));
  };
};
