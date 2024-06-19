const express = require("express");
const cartRouter = express.Router();
const Cart = require("../DataModels/cartDataModel");
const {
  createNotification,
  deleteNotification,
} = require("./notificationRoute");

// route for adding products to the cart
cartRouter.post("/api/cart", async (req, res) => {
  // Extract cart details from request body
  const { userId, products } = req.body;

  try {
    // Check if cart already exists for the user
    const existingCart = await Cart.findOne({ userId });

    // if exists, rewrite the cart
    if (existingCart) {
      existingCart.products = products;
      await existingCart.save();

      return res
        .status(200)
        .json({ cart: existingCart, message: "Updated cart successfully!" });
    } else {
      // Create a new cart
      const cart = new Cart({ userId, products });

      // Save the cart to the database
      await cart.save();

      return res
        .status(200)
        .json({ cart, message: "Added products to cart successfully!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Couldn't add products to cart" });
  }
});

cartRouter.get("/api/cart/:userId", async (req, res) => {
  // Extract userid from request body
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      const products = cart.products;
      // count current products
      const totalProducts = products.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      // Set message and url for notification
      const message = `Your cart has ${totalProducts} products ready for checkout`;
      const url = "cart";

      // add notification to the user
      await createNotification(userId, message, url);
      return res.status(200).json({ cart });
    } else {
      return res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Couldn't fetch cart" });
  }
});

cartRouter.delete("/api/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOneAndDelete({ userId });

    if (cart) {
      // delete any cart notifications
      deleteNotification(userId, "cart");
      return res
        .status(200)
        .json({ message: "Cart deleted successfully!", cart });
    } else {
      return res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Couldn't delete cart" });
  }
});

module.exports = cartRouter;
