//express router - class to create the route table
//define the API verbs
//define the API verbs restrictions
//doesn't needs express app invocation
//we can work same way we did with express app

let express = require("express")

let adminRouter = express.Router({}) // 


adminRouter.get("/",(req, res)=>{
    res.send("Hello World from Admin APP")
})

adminRouter.get("/info",(req, res)=>{
    res.send("No Information present at the moment Test!!!")
})
  

  module.exports = adminRouter;