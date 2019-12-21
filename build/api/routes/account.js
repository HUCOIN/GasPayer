"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountController = __importStar(require("../controllers/account"));
const sessionController = require("../controllers/account").sessionController;
// eslint-disable-next-line
const router = express_1.default.Router();
exports.accountRoutes = router;
router
    .route("/login")
    // POST /
    .post(accountController.userLogin);
// If its in live add account create rate limiter
router
    .route("/signup")
    // POST /
    .post(accountController.createUser);
router
    .route("/signup")
    // GET /
    .get(accountController.signupScreen);
router
    .route("/logout")
    // POST /
    .post(accountController.logout);
router
    .route("/login")
    // GET /
    .get(accountController.loginScreen);
