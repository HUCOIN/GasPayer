import Web3 from "web3";
let web3 :Web3 = new Web3(
  new Web3.providers.HttpProvider("https://ropsten.infura.io/")
);
import * as util from "../lib/ethereumjs-util";
import * as tx  from "../lib/ethereumjs-tx";
// TODO: configure chainID properly

export const signTry = () => {
let privateKey =
  "0xc0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0de";
let privateKeyN =
  "c0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0de";
let privateKeyBuff = Buffer.from(privateKeyN, 'hex');
console.log(privateKeyBuff.length);
console.log(privateKeyBuff);

let publicKeyBuffer = util.privateToPublic(privateKey);
let publicKey = util.bufferToHex(publicKeyBuffer);
let payerAddress = '0x' + util.bufferToHex(util.keccak256(publicKeyBuffer)).slice(26);

let senderPrvKey =
  "0xa0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0ae";
let senderPrvKeyN =
  "a0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0ae";
let senderPrvKeyBuff = Buffer.from(senderPrvKeyN, "hex");
let senderPubKeyBuffer = util.privateToPublic(senderPrvKey);
let senderPubKey = util.bufferToHex(publicKeyBuffer);
let senderAddress =
  "0x" + util.bufferToHex(util.keccak256(publicKeyBuffer)).slice(26);

console.log("Payer Address",payerAddress);
let rawTx = {
  sender:senderAddress,
  nonce: web3.utils.toHex(0),
  gasPrice: web3.utils.toHex(20000000000),
  gasLimit: web3.utils.toHex(100000),
  to: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
  value: web3.utils.toHex(1000),
  data: "0xc0de"
};

let transaction = new tx.Transaction(rawTx);
console.log(transaction.payerSign);
transaction.payerSign(privateKeyBuff,publicKeyBuffer);
transaction.sign(senderPrvKeyBuff);
console.log(transaction);
//0x53ae893e4b22d707943299a8d0c844df0e3d5557
};
signTry();