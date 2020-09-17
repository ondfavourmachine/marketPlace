"use strict";
// const express = require("express");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
/* in the package.jsson file the start command means: run tsc to tell typescript to compile to js and then run the compiled js using node */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require("morgan");
const bodyParser = require("body-parser");
// instantiate an express server
// configure it to use bodyParser to parse incoming requests
// Middlewares
const app = express_1.default();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// create http routes get, post
app.get("/", (req, res) => {
    res.send("The sedulous hyena ate the antelope!");
});
app.listen(3000, () => console.log(`Server is listening on 3000`));
// app.listen(3000);
