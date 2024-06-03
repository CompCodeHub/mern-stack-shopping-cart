import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveUserHobby } from "../../../state/User/userAction";

const Hobbies = () => {
  // Get user from store
  const user = useSelector((store) => store.userReducer.user);

  // local state for hobby
  const [hobby, setHobby] = useState("");

  // for dispatching actions
  const dispatch = useDispatch();

  // Handle adding hobby
  const addHobbyHandler = (evt) => {
    evt.preventDefault();

    // dispatch save user hobby action
    dispatch(SaveUserHobby(user.userName, hobby));

    // Reset hobby state
    setHobby("");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Add New Hobby</h2>
            <form onSubmit={addHobbyHandler}>
              <div className="mb-3">
                <label className="form-label">Hobby Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={hobby}
                  onChange={(evt) => setHobby(evt.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col">
            <h2>Your Hobbies</h2>
            <ul className="list-group list-group-flush">
              {user ? (
                user.hobbies.map((hobby, index) => (
                  <li key={index} className="list-group-item">
                    {hobby}
                  </li>
                ))
              ) : (
                <p>Error Fetching hobbies</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hobbies;
