"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const MongoStore = require("connect-mongo")(express_session_1.default);
let mongoose = require("mongoose");
const routes_1 = require("./api/routes");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
console.log(process.env.PROJECT_ENV);
// Load dot env files according to PROJECT_ENV variable(env variable)
dotenv_1.default.load({ path: ".env.dev" });
let app = express();
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
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
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
app.use(express_session_1.default({
    secret: "SoSECREEET",
    // 60 Days
    cookie: { maxAge: 518400000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true
}));
// Setup the passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Specify the routers
// let dirparts = __dirname.split("/");
// if(dirparts[dirparts.length-1]=="build"){
// }
console.log(path_1.default.join(__dirname, "frontend/assets"));
app.use(express.static("./frontend/assets"));
app.use("/", routes_1.router);
// Create http server
http_1.default.createServer(app).listen(port);
// If no handler for the url send NotFound
app.use(function (req, res) {
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
exports.db = db;
exports.app = app;
