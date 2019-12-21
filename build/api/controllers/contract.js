"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_1 = require("../models/contracts");
exports.addContract = (req, res, next) => {
    const user = req.user;
    const address = req.body.address;
    const isFunctionPayable = req.body.isFunctionPayable;
    const functionName = req.body.functionName;
    const parameters = req.body.parameters;
    const paymentAmount = req.body.paymentAmount;
    let contract = new contracts_1.Contract();
    contract.address = address;
    contract.functionName = functionName;
    contract.parameters = parameters;
    contract.paymentAmount = paymentAmount;
    contract.userMail = user.email;
    contract.userWallet = user.wallet;
    contract.isFunctionPayable = isFunctionPayable;
    user.contracts.append(contract);
    user.save(err => {
        if (err) {
            res.send({ success: false, msg: "Error while saving user" });
        }
        else {
            res.send({ success: true });
        }
    });
};
exports.a = (req, res, next) => {
    next();
};
