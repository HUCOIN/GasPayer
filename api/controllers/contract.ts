import express from "express";
import { User, IUserModel } from "../models/user";
import { Contract } from "../models/contracts";

export const addContract = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user: any = req.user;
  const address: string = req.body.address;
  const isFunctionPayable: boolean = req.body.isFunctionPayable;
  const functionName: string = req.body.functionName;
  const parameters: string = req.body.parameters;
  const paymentAmount: number = req.body.paymentAmount;
  const name: string = req.body.name;
  let contract = new Contract();
  contract.name = name;
  contract.address = address;
  contract.functionName = functionName;
  console.log(parameters);
  contract.parameters = JSON.parse(parameters);
  contract.paymentAmount = paymentAmount;
  contract.userMail = user.email;
  contract.userWallet = user.wallet;
  contract.isFunctionPayable = isFunctionPayable;

  user.contracts.push(contract);
  user.save(err => {
    if (err) {
      res.send({ success: false, msg: "Error while saving user" });
    } else {
      res.send({ success: true });
    }
  });
};

export const getContracts = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user: any = req.user;
  return res.render("contract", {
    balance: user.balance,
    contracts: user.contracts
  });
};

export const newContract = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user: any = req.user;
  return res.render("newContract", { balance: user.balance });
};
export const a = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  next();
};
