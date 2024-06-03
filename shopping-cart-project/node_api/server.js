//importing express top class and then creating express server

const express = require("express"); //express class constructor
const app = express(); //invoking the class to create express app server
require("dotenv").config();
const port = 9000; //
const cors = require("cors");
const defaultRouter = require("./Routers/defaultRoute");
const adminRouter = require("./Routers/adminRoute");
const userRouter = require("./Routers/userRoute");
const proudctRouter = require("./Routers/productRoute");
const cartRouter = require("./Routers/cartRoute");

global.rootDir = __dirname;

//we can have one main and multiple other express apps at a place
const adminApp = express(); // a new express app to handle requests mounted with admin in path
const userApp = express();
const proudctApp = express();
const cartApp = express();

app.use(cors()); //enabling cross origin resource sharing at root level
//setting up the middleware static to handle all the static files we need to serve to client
// serve static files like images css using static middleware
app.use("/static", express.static("public")); //localhost:9000/static/alert.js

//json middle-ware for setting request content type to json in body
app.use(express.json({ limit: "2mb", extended: false }));

//path mounting to other express app
app.use("/admin", adminApp);
adminApp.use(adminRouter);

//api path signinup => localhost:9000/user/api/signinup
app.use("/user", userApp);
userApp.use(userRouter);

app.use("/product", proudctApp);
proudctApp.use(proudctRouter);

app.use("/cart", cartApp);
cartApp.use(cartRouter);

app.use("/", defaultRouter);

app.listen(port);

console.log("api launched at - localhost:" + port);
