import express from "express";
import User from "./router/User.js";
import bodyParser  from "body-parser";



export const app = express();

// in latest body-parser use like below.



app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post('/test', (req, res) => {
  res.json({requestBody: req.body.name})  // <==== req.body will be a parsed JSON object
  console.log(req.body.name);
  
})


app.use('/posts', () => { 
  console.log("Middleware is running");

});

app.post('/', (req, res) => {
  res.send('Got a POST request')
})


app.use("/api/v1", User);

app.get("/", (req, res) => {
    res.send("Server is working");
  });

