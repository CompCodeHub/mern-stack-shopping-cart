import * as actionTypes from "../actionTypes";

let initialState = {
  user: {
    userName: "Dummy",
    password: "asdsadasda",
    street: "somewhere on earth",
    mobile: 898989898,
    hobbies: ["Dummy Hobby1"],
  },
};

// action => type and payload

let userReducer = (state = initialState, action) => {
  //console.log("User Actions ", action);

  switch (action.type) {
    case actionTypes.ADD_USER_TO_STORE:
      //...state == is extracting all the states present in store
      //action.payload - is the new user data that we need to add to store
      //User: action.payload - new payload is assigned to used

      return { ...state, user: action.payload }; //new state dispatched to store upon update
    case actionTypes.ADD_HOBBY_TO_USER:
      // Get user from current state and create a copy
      const updatedUser = { ...state.user };

      // Get hobby from payload
      const hobby = action.payload;

      // Add hobby to user's hobbies array
      updatedUser.hobbies = [...updatedUser.hobbies, hobby];

      // Return a new state object with the updated user
      return {
        ...state,
        user: updatedUser,
      };
    // return {
    //   ...state,
    //   user: {
    //     ...state.user,
    //     hobbies: [...state.user.hobbies, action.payload],
    //   },
    // };
    default:
      return state; //if no action type matched return default state
  }
};

export default userReducer;
