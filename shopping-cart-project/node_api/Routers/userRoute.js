let express = require("express");
let userRouter = express.Router({}); //

let UserDataModel = require("../DataModels/UserDataModel"); //this gives access to all the methods defined in mongoose to access mongo db data

//we'll accept the user object as req.body, use it to map with user.schema key value pair
//initialize the userModel, if no validation error, then use the mongoose method to save user
userRouter.post("/api/signinup", (req, res) => {
  //localhost:9000/user/api/signinup
  console.log(req.body); //json data posted from API in body
  //initialize the userSchema

  UserDataModel.findOne({ userName: req.body.userName })
    .then((existingUser) => {
      if (existingUser) {
        console.log("sigin in success ", existingUser);
        res.send(existingUser);
      } else {
        //if user object is not present in users collection so we need to create
        //new user and this is sign up

        let newUser = new UserDataModel(req.body);

        newUser
          .save()
          .then((newUser) => {
            //will get _id once document is created
            console.log("successful signup ", newUser);
            res.send(newUser);
          })
          .catch((err1) => {
            console.log("err signup", err1);
            res.send("error while sign up");
          });
      }
    })
    .catch((err) => {
      console.log("err sign in", err);
      res.send("error while searching user sign in");
    });
});

//code to fetch all the users from user collection and return back
userRouter.get("/api/users", (req, res) => {
  UserDataModel.find()
    .then((allusers) => {
      res.send(allusers);
    })
    .catch(() => {
      res.send("error while fetching users");
    });
});

userRouter.post("/api/hobbies", async (req, res) => {
  const { userName, hobby } = req.body;

  try {
    // find User
    const user = await UserDataModel.findOne({ userName });

    //add the hobby to array of hobbies
    if (!user.hobbies.includes(hobby)) {
      user.hobbies.push(hobby);
    }

    // save user
    await user.save();

    return res
      .status(200)
      .json({ message: `Hobby added for user: ${userName}` });
  } catch (error) {
    return res
      .status(404)
      .json({ error: `No user found with username: ${userName}` });
  }
});

userRouter.get("/api/hobbies", async (req, res) => {
  const { userName } = req.body;

  try {
    // find User
    const user = await UserDataModel.findOne({ userName });

    return res.status(200).json({ hobbies: user.hobbies });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "No user found with username: ", userName });
  }
});

module.exports = userRouter;
