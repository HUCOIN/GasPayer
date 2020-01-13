import Web3 from "web3";
const fs = require('fs');
let web3 :Web3 = new Web3(
  new Web3.providers.HttpProvider("https://ropsten.infura.io/")
);
import * as util from "../lib/ethereumjs-util";
import * as tx  from "../lib/ethereumjs-tx";
// TODO: configure chainID properly
tx

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
  to: "0xe0227F57f561D87568d89cD17eE23C58aB8f2474",
  value: web3.utils.toHex(2000000000000),
  data: "0xc0de"
};

let transaction = new tx.Transaction(rawTx);
let normalTransaction = new tx.Transaction(rawTxNormal);
console.log(transaction.payerSign);
transaction.payerSign(privateKeyBuff,publicKeyBuffer);
transaction.sign(senderPrvKeyBuff);
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
//0x53ae893e4b22d707943299a8d0c844df0e3d5557
};
signTry();