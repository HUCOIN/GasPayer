import express from "express";
import * as contractController from "../controllers/contract";
// eslint-disable-next-line
const router = express.Router();

router
  .route("/add")
  // POST /
  .post(contractController.addContract);

router
  .route("/")
  // POST /
  .get(contractController.getContracts);
router
  .route("/add")
  // POST /
  .get(contractController.newContract);
router
  .route("/callFunction")
  .post(contractController.callFunction)
router
  .route("/deleteContract")
  .post(contractController.deleteContract)

export { router as contractRoutes };
