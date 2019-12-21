import express from "express";
import * as mainController from "../controllers/main";
const sessionController = require("../controllers/account").sessionController;
// eslint-disable-next-line
const router = express.Router();

router
  .route("/dashboard")
  // GET /
  .get(sessionController, mainController.dashboard);

export { router as mainRoutes };
