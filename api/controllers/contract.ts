import express from "express";
import { User, IUserModel } from "../models/user";
import { Contract } from "../models/contracts";
import Web3 from 'web3';
import { contractRoutes } from "../routes/contract";
import { signTry } from "../utils/signer";
import http from "http";

export const addContract = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user: any = req.user;
  const address: string = req.body.address;

  const name: string = req.body.name;
  let contract = new Contract();
  contract.name = name;
  contract.address = address;
  contract.userMail = user.email;
  contract.userWallet = user.wallet;



  var options = {
    host: "127.0.0.1",
    port: 3001,
    path: '/contracts/' + contract.address,
    method: 'GET'
  };
  console.log("options " + options.path);

  http.request(options, function (result) {
    console.log('STATUS: ' + result.statusCode);
    result.setEncoding('utf8');
    result.on('data', function (data) {
      let funcs = JSON.parse(data);
      funcs.forEach(element => {

        if (element.type == "function") {
          var func = {
            body: element.name,
            payable: element.payable,
            inputs: element.inputs,
          };
          if (element.inputs.length != 0) {
            func.body += '(';
            let i = 0;
            element.inputs.forEach(input => {
              func.body += input.type;
              if (i == element.inputs.length - 1)
                func.body += ')';
              else
                func.body += ' ';
            });
          } else {
            func.body += '()';
          }
          contract.functions.push(func);
        }
      });
      user.contracts.push(contract);

      console.log(contract.functions);
      user.save(err => {
        if (err) {
          res.send({ success: false, msg: "Error while saving user" });
        } else {
          res.send({ success: true });
        }
      });
    });
  }).end();


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
  console.log("here");
  var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  var util = require('ethereumjs-util');
  var tx = require('ethereumjs-tx');

  console.log( req.body.funcName, req.body.parameter);
 /* web3.eth.getAccounts().then(accounts => {
    console.log(accounts);
    signTry(accounts[0], req.body.funcName, req.body.parameter);
  });*/
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

export const deleteContract = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user: any = req.user;
  user.contracts.forEach((contract, index) => {
    if (contract.name == req.body.name) {
      user.contracts.splice(index, 1);
      user.save(err => {
        if (err) {
          res.send({ success: false, msg: "Error while saving user" });
        } else {
          res.send({ success: true });
        }
      }); 
    }
  });
}

export const a = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  next();
};


