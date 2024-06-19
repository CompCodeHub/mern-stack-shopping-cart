const express = require("express");
const reviewRouter = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const { Review } = require("../DataModels/reviewDataModel");

// Route for saving user review
reviewRouter.post("/api/reviews",authenticate,  async (req, res) => {
  const { rating, comment, user, product, name } = req.body;

  try {
    // Check for duplicate review
    const duplicate = await Review.findOne({ product, user });
    if (duplicate) {
      // update the review
      duplicate.rating = rating;
      duplicate.comment = comment;
      await duplicate.save();

      return res.status(201).json(duplicate);
    } else {
      const review = new Review({ rating, comment, user, product, name });
      review.save();
      return res.status(201).json(review);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Route for fetching all reviews for a product
reviewRouter.get("/api/reviews/:product", authenticate, async (req, res) => {
  const { product } = req.params;

  try {
    const reviews = await Review.find({ product });
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Route for fetching a review for a given user and product
reviewRouter.get("/api/reviews/:product/:user", authenticate, async (req, res) => {
  const { product, user } = req.params;

  try {
    const review = await Review.findOne({ product, user });
    if (review) {
      return res.status(200).json(review);
    } else {
      return res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = reviewRouter;
