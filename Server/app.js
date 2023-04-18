import express from "express";
import User from "./router/User.js";


export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use("/api/v1", User);

app.get("/", (req, res) => {
    res.send("Server is working");
  });

