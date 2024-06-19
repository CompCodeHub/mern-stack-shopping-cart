import * as actionTypes from "../actionTypes";

const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case actionTypes.ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    }
    case actionTypes.REMOVE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification._id !== action.payload
        ),
      };
    }
    case actionTypes.REMOVE_NOTIFICATION_BY_URL: {
        return {
            ...state,
            notifications: state.notifications.filter(
                (notification) => notification.url !== action.payload
            ),
        };
    }
    case actionTypes.CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        notifications: [],
      };
    }
    default:
      return state;
  }
};
export default notificationReducer;
