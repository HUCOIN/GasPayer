import express from "express";
import { User, IUserModel } from "../models/user";
import { Contract } from "../models/contracts";
import Web3 from 'web3';
import { contractRoutes } from "../routes/contract";

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

export const callFunction = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {

  var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  var util = require('ethereumjs-util');
  var tx = require('ethereumjs-tx');


  web3.eth.getAccounts().then(accounts => {
    console.log(accounts);
  });
  /*console.log(web3.eth.defaultAccount);

  var rawTx = {
    nonce: Web3.utils.toHex(0),
    gasPrice: Web3.utils.toHex(20000000000),
    gasLimit: Web3.utils.toHex(100000),
    to: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
    value: Web3.utils.toHex(1000),
    data: '0xc0de'
  };*/ 

  console.log("creating transaction...");
};

export const a = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  next();
};


