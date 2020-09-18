// const express = require("express");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
/* in the package.jsson file the start command means: run tsc to tell typescript to compile to js and then run the compiled js using node */
// "dev": "nodemon --exec ts-node src/server.ts",

import express, { Request, Response } from "express";
import mongoose from "mongoose";
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

import User from "../models/userModel";

// this is to configure environmental variables
dotenv.config();
// instantiate an express server
// configure it to use bodyParser to parse incoming requests
// Middlewares
const app = express();
const database: any = process.env.DATABASE;
// connect to DB using mongoose
mongoose.connect(
  database,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection to Database was successfull!");
    }
  }
);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create http routes get, post
// GET is to retrieve data from the server
app.get("/", (req: Request, res: Response) => {
  //   console.log("i am working!");
  res.send("The sedulous hyena ate the antelope!");
  //   res.json("The sedulous hyena ate the antelope!");
});

// POST is to send data from the frontend to the backend
app.post("/", (req: Request, res: Response) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save(err => {
    if (err) return res.json(err);
    // res.status(200)
    res.json("User was saved successfully");
  });
});

app.listen(3000, () => console.log(`Server is listening on 3000`));
// testing
// n7UUZimhZF9Rglx5
