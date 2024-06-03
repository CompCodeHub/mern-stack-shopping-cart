//importing express top class and then creating express server

console.log("In server js")

const express = require('express') //express class constructor
const app = express() //invoking the class to create express app server

//we can have one main and multiple other express apps at a place
const adminApp = express(); // a new express app to handle requests mounted with admin in path


//setting up the middleware static to handle all the static files we need to serve to client
// serve static files like images css using static middleware 
app.use('/static', express.static('public')) //localhost:9000/static/alert.js


app.get('/', function (req, res) {
  res.send('Hello World!!! From Wanda!!')
})


//http://localhost:3000/data?name=suyash&session=express
app.get('/data', function (req, res) {
    let queryString = req.query //req.query - is used to read the values present after ? in api path
 
    //console.log(queryString)
    //console.log(res)
    console.log(req)
    if (queryString.session == "express") {
        res.json({"name " : queryString.name})
    }else{
        res.json(queryString)
    }
})


//http://localhost:3000/nameByID/2000
app.get('/nameByID/:id', function (req, res) {
    let queryParam = req.params["id"] //reads the parameter passed in path of API, we can have multiple query params
 
    console.log(queryParam)
    if (queryParam == 2000) {
        res.send("<h1>User is present</h1>")
    }else{
        res.send("<h1>User is not present</h1>")
    }
})


app.post('/adduser', function (req, res) {
    let data = req.body // {} this will contain the information passed as req.body as JSON object

    res.json(data)
})


app.get('/getalert', function (req, res) {
    res.sendFile(__dirname+"/Public/index.html")
})

// a hack to handle static files but a feasible approach
// app.get('/alert_me.js', function (req, res) {
//     res.sendFile(__dirname+"/Public/alert_me.js")
// })


//fallback for every API not available
//this is wild card to accept all calls
// app.all('*', function (req, res) {
//     res.sendFile(__dirname+"/Public/index.html")
// })


//path mounting to other express app
app.use("/admin", adminApp)

adminApp.get("/",(req, res)=>{
    res.send("Hello World from Admin APP")
})

adminApp.get("/info",(req, res)=>{
    res.send("No Information present at the moment!!!")
})



app.listen(3000)

console.log("api launched at - localhost:3000")