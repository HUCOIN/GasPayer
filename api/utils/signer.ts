import Web3 from "web3";
let web3: Web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
import * as util from "ethereumjs-util";
import * as tx from "ethereumjs-tx";
// TODO: configure chainID properly

export const signTry = (account) => {
  /*let privateKey =
    "0xc0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0de";
  let privateKeyN =
    "c0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0de";
  let privateKeyBuff = Buffer.from(privateKeyN, 'hex');
  
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
  
  var funcSignatureBuffer = util.keccak256("setName(string)").slice(0, 4);
  console.log(util.bufferToHex(funcSignatureBuffer));
  var param1Hex = Buffer.alloc(32);
  param1Hex.write("anan");
  var buffList = [funcSignatureBuffer, param1Hex];
  var funcData = Buffer.concat(buffList);
  console.log(util.bufferToHex(funcData));
  console.log(util.bufferToHex(param1Hex));*/

  const myContract = require("./contract.json");

  var contract = new web3.eth.Contract(myContract, "0xcf603f76655ABA9E4Cf03bec5563969226faffA3");
  var funcTx = contract.methods['setName(string)']("anan").encodeABI();

  web3.defaultAccount = account;

  let rawTx = {
    nonce: web3.utils.toHex(1),
    gasPrice: web3.utils.toHex(20000000000),
    gasLimit: web3.utils.toHex(100000),
    to: "0xad840B74C3007569a4C616641583d27A1F0cdfAc",
    data: funcTx // TODO: BURAYI DEGISTIR
  };

  let transaction = new tx.Transaction(rawTx);
  
  //transaction.payerSign(privateKeyBuff,publicKeyBuffer);
  transaction.sign(Buffer.from("35589391f5b63d99ed31e8f692a37caf22ef75ebb7da46a23942f45679ea4ba4", "hex"));
  console.log(transaction);


  web3.eth.sendSignedTransaction(
    util.bufferToHex(transaction.serialize()),
    (err, hash) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Tx is successful hash is ", hash);
    }
  );


};

