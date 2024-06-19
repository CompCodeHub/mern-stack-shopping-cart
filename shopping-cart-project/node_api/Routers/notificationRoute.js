const express = require("express");
const notificationRouter = express.Router();
const Notification = require("../DataModels/notificationDataModel");

// route for fetching unread notifications
notificationRouter.get("/api/notifications/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const notifications = await Notification.find({
      user: userId,
    });
    return res.status(200).json(notifications);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// route for deleting notifications after they are read
notificationRouter.delete("/api/notifications/:url", async (req, res) => {
  try {
    // delete all notifcations with the given url
    const url = req.params.url;
    const notification = await Notification.deleteMany({ url });
    
    return res.status(200).json(notification);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// function to create notifications for a user
const createNotification = async (userId, message, url) => {
  // Search for existing notification
  const existingNotification = await Notification.findOne({
    user: userId,
    url,
  });

  if (existingNotification) {
    // Update the existing notification
    existingNotification.message = message;
    await existingNotification.save();
  } else {
    const notification = new Notification({
      user: userId,
      message,
      url,
    });
    await notification.save();
  }
};

const deleteNotification = async (userId, url) => {
  await Notification.findOneAndDelete({ user: userId, url });
};

module.exports = { notificationRouter, createNotification, deleteNotification };
