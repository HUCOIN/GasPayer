import express from "express";
import * as accountController from "../controllers/account";
const sessionController = require("../controllers/account").sessionController;
// eslint-disable-next-line
const router = express.Router();

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
export { router as accountRoutes };
