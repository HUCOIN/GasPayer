import Web3 from "web3";
const fs = require('fs');
const net = require('net');
var Web3WsProvider = require('web3-providers-ws');
let web3: Web3 = new Web3("http://localhost:8545", net);
import * as util from "../lib/ethereumjs-util";
import * as tx  from "../lib/ethereumjs-tx";
// TODO: configure chainID properly
var abi = require("../../abi.json");
var MyContract = new web3.eth.Contract(abi, "0xa74eF39C89DA30e0068D2Ccb916E71A5B1D43439");
MyContract.methods
  .get()
  .call()
  .then(console.log);


export const signTry = () => {
let privateKey =
  "0x07552BCFF7AD561516039F798DEAAF5CD819BFCBC395C3BA676EA5FFAA78D675";
let privateKeyN =
  "07552BCFF7AD561516039F798DEAAF5CD819BFCBC395C3BA676EA5FFAA78D675";
let privateKeyBuff = Buffer.from(privateKeyN, 'hex');
console.log(privateKeyBuff.length);
console.log(privateKeyBuff);
let publicKeyBuffer = util.privateToPublic(privateKey);
let publicKey = util.bufferToHex(publicKeyBuffer);
let payerAddress = '0x' + util.bufferToHex(util.keccak256(publicKeyBuffer)).slice(26);
console.log("Payer Address : ", payerAddress);
let senderPrvKey =
  "0x0AB7B2050F5E99A54E8780DEC6C43FE75A00308D9E8C0F96FBA88B7B38315FEC";
let senderPrvKeyN =
  "0AB7B2050F5E99A54E8780DEC6C43FE75A00308D9E8C0F96FBA88B7B38315FEC";
let senderPrvKeyBuff = Buffer.from(senderPrvKeyN, "hex");
let senderPubKeyBuffer = util.privateToPublic(senderPrvKey);
let senderPubKey = util.bufferToHex(publicKeyBuffer);
let senderAddress =
  "0x" + util.bufferToHex(util.keccak256(senderPubKeyBuffer)).slice(26);
console.log("Payer Address",payerAddress);


// To address 0x59641146B8204365f9B0EDBaBE6F09362f02bC3e
let rawTxNormal = {
  //sender: senderAddress,
  nonce: web3.utils.toHex(0),
  gasPrice: web3.utils.toHex(20000000000),
  gasLimit: web3.utils.toHex(100000),
  to: "0xe0227F57f561D87568d89cD17eE23C58aB8f2474",
  value: web3.utils.toHex(1000000000000),
  data: "0xc0de"
};

let rawTx = {
  sender: senderAddress,
  nonce: web3.utils.toHex(0),
  gasPrice: web3.utils.toHex(20000000000),
  gasLimit: web3.utils.toHex(100000),
  to: "0x73f266EC10BABb68EBBaE8F011050e44123e0029",
  value: web3.utils.toHex(2000000000000),
  data: "0xc0de"
};

let newContractTx = {
  sender: senderAddress,
  nonce: web3.utils.toHex(3),
  gasPrice: web3.utils.toHex(20000000000),
  gasLimit: web3.utils.toHex(100000),
  //to: "0x0000000000000000000000000000000000000000",
  to:"0xa74eF39C89DA30e0068D2Ccb916E71A5B1D43439",
  value: web3.utils.toHex(0),
  data:
    //"0x608060405234801561001057600080fd5b5060df8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60aa565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058200aeb01a12af205de80b45a8f0c438e6e7fd66ca86a43330adbd996cd974450410029"
    "0x60fe47b100000000000000000000000000000000000000000000000000000000000000c8"
};

let transaction = new tx.Transaction(rawTx);
let normalTransaction = new tx.Transaction(rawTxNormal);
console.log(transaction.payerSign);
transaction.payerSign(privateKeyBuff,publicKeyBuffer);
transaction.sign(senderPrvKeyBuff);
let newContractTransaction = new tx.Transaction(newContractTx);

newContractTransaction.payerSign(privateKeyBuff,publicKeyBuffer);
newContractTransaction.sign(senderPrvKeyBuff);
console.log(util.bufferToHex(Buffer.concat(transaction.raw)));
console.log(transaction.toJSON());
console.log("Sender Address", senderAddress);
console.log("From :",util.bufferToHex(transaction.getFrom()));
console.log("Payer public Key:",publicKey);

normalTransaction.sign(privateKeyBuff);


fs.writeFile("hex.txt", util.bufferToHex(transaction.serialize()), err => {
  // throws an error, you could also catch it here
  if (err) throw err;

  // success case, the file was saved
  console.log("Lyric saved!");
});
fs.writeFile("normalHex.txt", util.bufferToHex(normalTransaction.serialize()), err => {
  // throws an error, you could also catch it here
  if (err) throw err;

  // success case, the file was saved
  console.log("Lyric saved!");
});
fs.writeFile(
  "contractHex.txt",
  util.bufferToHex(newContractTransaction.serialize()),
  err => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("Lyric saved!");
  }
);
// web3.eth.sendSignedTransaction(
//   util.bufferToHex(transaction.serialize()),
//   (err, hash) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Tx is successful hash is ", hash);
//   }
// );
// web3.eth.sendSignedTransaction(
//   util.bufferToHex(newContractTransaction.serialize()),
//   (err, hash) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Tx is successful hash is ", hash);
//   }
// );
//0x53ae893e4b22d707943299a8d0c844df0e3d5557
};
signTry();