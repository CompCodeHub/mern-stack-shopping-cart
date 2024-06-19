import * as actionTypes from "../actionTypes";
import axios from "axios";

export const LoadNotifications = (notifications) => {
  return {
    type: actionTypes.LOAD_NOTIFICATIONS,
    payload: notifications,
  };
};

export const AddNotification = (notification) => {
  return {
    type: actionTypes.ADD_NOTIFICATION,
    payload: notification,
  };
};

export const RemoveNotification = (notificationId) => {
  return {
    type: actionTypes.REMOVE_NOTIFICATION,
    payload: notificationId,
  };
};

export const RemoveNotificationByUrl = (url) => {
  return {
    type: actionTypes.REMOVE_NOTIFICATION_BY_URL,
    payload: url,
  };
};

export const LoadNotificationsFromDB = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/notification/api/notifications/${userId}`
      );
      dispatch(LoadNotifications(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const RemoveNotificationFromDB = (url) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `http://localhost:9000/notification/api/notifications/${url}`
      );
      dispatch(RemoveNotificationByUrl(url));
    } catch (error) {
      console.error(error);
    }
  };
};
