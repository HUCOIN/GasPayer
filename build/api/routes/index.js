"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_1 = require("./main");
const sessionController = require("../controllers/account").sessionController;
const account_1 = require("./account");
const contract_1 = require("./contract");
const router = express_1.default.Router();
exports.router = router;
// Server heart beat for checking if its alive
router.get("/server-stat", (req, res) => res.sendStatus(200));
router.use("/", main_1.mainRoutes);
router.use("/account", account_1.accountRoutes);
router.use("/contract", sessionController, contract_1.contractRoutes);
//# sourceMappingURL=index.js.map