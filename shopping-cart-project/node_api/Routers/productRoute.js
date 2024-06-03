const express = require("express");
const productRouter = express.Router();

const { Product } = require("../DataModels/productDataModel");

const { uploadToCloudinary } = require("../Services/cloudinary");

// route for create product
productRouter.post("/api/products", async (req, res) => {
  // Extract product details from request body
  const { name, price, description, image, rating, category, quantity } = req.body;

  try {
    // Check if product already exists
    const product = await Product.findOne({ name });

    // If product exists, return error
    if (product) {
      return res.status(400).json({ error: "Product already exists" });
    } else {
      // Image must be present
      if (!image) {
        console.log(image);
        return res.status(400).json({ error: "Product Image is required" });
      } else {
        // Upload image to cloudinary
        const uploadedImageData = await uploadToCloudinary(image, "products");

        // Create new product
        const newProduct = new Product({
          name,
          price,
          description,
          image: uploadedImageData,
          rating: rating ? rating : 0,
          category: category ? category : "General",
          quantity
        });
        await newProduct.save();
        return res
          .status(200)
          .json({ product: newProduct, message: "Product saved successfully" });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: "Couldn't save product" });
  }
});

// route for get all products
productRouter.get("/api/products", async (req, res) => {
  try {
    // find all products
    const products = await Product.find();

    // return products
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: "Couldn't fetch products" });
  }
});

module.exports = productRouter;
