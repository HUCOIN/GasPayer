"use strict";
import express = require("express");
import dotenv from "dotenv";
import http from "http";
import https from "https";
import session from "express-session";
import passport from "passport";
const MongoStore = require("connect-mongo")(session);
let mongoose = require("mongoose");
import { router } from "./api/routes";
import bodyParser from "body-parser";
import path from "path";
import * as signer from "./api/utils/signer";
console.log(process.env.PROJECT_ENV);
// Load dot env files according to PROJECT_ENV variable(env variable)
dotenv.load({ path: ".env.dev" });

let app: express.Application = express();
// Because we are behind a proxy in the cloud
app.enable("trust proxy");
// Read https files
// const key = fs.readFileSync("configs/https/server.key");
// const cert = fs.readFileSync("configs/https/server.crt");
// const ca = fs.readFileSync("configs/https/server.pem");
// const httpsOptions = {
//   key: key,
//   cert: cert,
//   ca: ca
// };
// Create https server
// let httpsServer = https.createServer(httpsOptions, app);
// httpsServer.listen(443);
// let conf = {
//   db: {
//     db: "sessions",
//     host: process.env.MONGO_URL
//   },
//   secret: process.env.SESSION_SECRET || "SCRIMUPAN"
// };
// Configure Session Db
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
let options = {};
// Connect to mongoDB
let mongoDB = process.env.MONGO_URL;
//   let mongoUser = process.env.MONGO_USER;
//   let mongoPassword = process.env.MONGO_PASS;
//   options = {
//     db: { native_parser: true },
//     server: { poolSize: 5 },
//     user: mongoUser,
//     pass: mongoPassword,
//     promiseLibrary: global.Promise
//   };
//   mongoose.connect(mongoDB, options);
// } else {
//   
// }
mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
// Setup the sessions
app.use(
  session({
    secret: "SoSECREEET",
    // 60 Days
    cookie: { maxAge: 518400000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true
  })
);
// Setup the passport
app.use(passport.initialize());
app.use(passport.session());

// Specify the routers
// let dirparts = __dirname.split("/");
// if(dirparts[dirparts.length-1]=="build"){

// }
console.log(path.join(__dirname, "frontend/assets"));
app.use(express.static("./frontend/assets"));
app.use("/", router);
// Create http server
http.createServer(app).listen(port);

// If no handler for the url send NotFound
app.use(function (req: express.Request, res: express.Response) {
  res.send({ msg: "NotFound", url: req.url });
});

// On error 500 send server error
app.use(function (req, res) {
  res.status(500).send({
    success: false,
    msg: "Server Error"
  });
});
// Routine Jobs //
// Clear Availability  Repeating Rule

app.set("views", "./frontend/views");
app.set("view engine", "pug");

// On unhandled Promise notify Bilge about this promise and error

signer.signTry();

exports.db = db;
exports.app = app;
