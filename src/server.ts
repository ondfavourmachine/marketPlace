// const express = require("express");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
/* in the package.jsson file the start command means: run tsc to tell typescript to compile to js and then run the compiled js using node */
// "dev": "nodemon --exec ts-node src/server.ts",

import express, { Request, Response } from "express";
const morgan = require("morgan");
const bodyParser = require("body-parser");

// instantiate an express server
// configure it to use bodyParser to parse incoming requests
// Middlewares
const app = express();
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
//   res.send(req.body);
  console.log(req.body);
});

app.listen(3000, () => console.log(`Server is listening on 3000`));
// testing
