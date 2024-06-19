const express = require("express");
const orderRouter = express.Router();
const Order = require("../DataModels/orderDataModel");
const { createNotification } = require("./notificationRoute");
const { authenticate } = require("../middlewares/authMiddleware")

// route for fetching user orders
orderRouter.get("/api/orders/:userId",authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.params.userId });

    // Current date and time
    const currentDate = new Date();

    // for counting number of delivered orders
    let deliveredCount = 0;

    for (let order of orders) {
      const orderDate = new Date(order.paidAt); // Assuming the order date is stored in a field named 'date'
      const timeDifference = currentDate - orderDate;
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (
        daysDifference > 2 &&
        order.status !== "CANCELLED" &&
        order.status != "DELIVERED"
      ) {
        order.status = "DELIVERED";
        deliveredCount++;
        await order.save();
      }
    }

    // create notification for delivered orders
    if (deliveredCount > 0) {
      const userId = req.params.userId;
      const message = `You have ${deliveredCount} order(s) delivered.`;
      const url = "orders";
      await createNotification(userId, message, url);
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// route for saving order
orderRouter.post("/api/orders",authenticate, async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// route for cancelling order
orderRouter.delete("/api/orders/:orderId", authenticate, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);

    order.status = "CANCELLED";
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = orderRouter;
