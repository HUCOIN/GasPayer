import express from "express";
import { mainRoutes } from "./main";
const sessionController = require("../controllers/account").sessionController;
import { accountRoutes } from "./account";
import { contractRoutes } from "./contract";
const router = express.Router();

// Server heart beat for checking if its alive
router.get("/server-stat", (req: express.Request, res: express.Response) =>
  res.sendStatus(200)
);

router.use("/", mainRoutes);
router.use("/account", accountRoutes);
router.use("/contract",sessionController, contractRoutes);
export { router };
