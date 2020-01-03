"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.contractSchema = new Schema({
    name: String,
    address: String,
    functionName: String,
    parameters: Object,
    paymentAmount: Number,
    userWallet: String,
    userMail: String,
    isPaid: { type: Boolean, default: false },
    isFunctionPayable: Boolean,
    returnValue: String
});
exports.userSchema = new Schema({
    email: String,
    password: String,
    contracts: [exports.contractSchema],
    balance: Number
});
//# sourceMappingURL=schemas.js.map