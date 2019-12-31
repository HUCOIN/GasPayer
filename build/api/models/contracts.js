"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schemas_1 = require("./schemas");
let Contract = mongoose_1.default.model("Contract", schemas_1.contractSchema);
exports.Contract = Contract;
//# sourceMappingURL=contracts.js.map