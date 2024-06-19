import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SaveUserToDB,
  SaveUserToDBUsingFetch,
} from "../../../state/User/userAction";
import { useNavigate } from "react-router-dom";
import { LoadNotificationsFromDB } from "../../../state/Notification/notificationAction";
// useState - to create state for each option
// useRef - initialize with store/reducer data and then allow to update

let UserHook = (props) => {
  //subscribe and read from userReducer using useSelector
  let User = useSelector((store) => store.userReducer.user); //reads defined data in reducer

  // initializes state and returns a callback which we can use to update the state
  let [uName, setUserName] = useState(User.userName); //user.userName - defined in userReducer
  let [pass, setPassword] = useState(User.password);
  let [street, setStreet] = useState(User.street);
  let [mobile, setPhone] = useState(User.mobile);

  let onTextChange = (evt) => {
    let val = evt.target.value;
    setUserName(val);
    evt.preventDefault();
  };

  // for navigation
  const navigate = useNavigate();

  //this makes the component as publisher for the data back to store => dispatches
  let dispatch = useDispatch();

  let loginUser = (evt) => {
    let newUser = {
      userName: uName,
      password: pass,
      street,
      mobile,
    };
    //dispatchToDB(SaveUserToDB(newUser))
    dispatch(SaveUserToDBUsingFetch(newUser));
    evt.preventDefault();
    navigate("/products");
  };

  //sessionName.current.value = User.userName //we can't access the element as it is not rendered yet

  //shouldcomponentUpdate, componentDidMount
  //default it is shouldcomponentUpdate
  //when first rendering is done and UI can be accessed - componentDidMount
  //useeffect is the hook that we use to make it work as shouldComponentUpdate, componentDidMount, componentWillUnmount
  //using useEffect to implement componentDidMount and then add the value to ref element
  useEffect(() => {
    //console.log("Re render happend");

    //componentWillUnmount
    return () => {
      //clear intervals, api subscription etc that should be removed before we move to next component
      //console.log("Makes use effect to work for componentWillUnmount");
    };
  }, []); //if we pass an object to initialize it works as componentDidMount, and executes in create LC, else works as shouldComponent Update

  return (
    <>
      <h1>User Login Page</h1>
      <section className={"componentClass"}>
        <div className="form col-md-8">
          <div className="col-md-12">
            <b>User Name</b>
            <input
              type="text"
              className="form-control col-md-6 username"
              value={uName} //state to update the userName
              placeholder="User Name"
              onChange={onTextChange}
              maxLength={40}
            />
          </div>
          <div className="col-md-12">
            <b>Password</b>
            <input
              type="password"
              className="form-control col-md-6 pass"
              value={pass}
              placeholder="Password"
              onChange={(evt) => setPassword(evt.target.value)}
              maxLength={40}
            />
          </div>
          <div className="col-md-12">
            <b>Street </b>
            <input
              type="text"
              className="form-control col-md-6 street"
              value={street}
              placeholder="Street Name"
              onChange={(evt) => setStreet(evt.target.value)}
            />
          </div>

          <div className="col-md-12">
            <b>Mobile </b>
            <input
              type="number"
              className="form-control col-md-6 mobile"
              value={mobile}
              placeholder="Mobile"
              maxLength={11}
              onChange={(evt) => setPhone(evt.target.value)}
            />
          </div>
          <input
            type="button"
            className={"btn btn-primary col-md-2 saveUser"}
            value={"SignIn-Up"}
            onClick={loginUser}
          />
        </div>
      </section>
    </>
  );
};

export default UserHook;
