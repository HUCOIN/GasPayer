"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
let web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://ropsten.infura.io/"));
const util = __importStar(require("../lib/ethereumjs-util"));
const tx = __importStar(require("../lib/ethereumjs-tx"));
// TODO: configure chainID properly
exports.signTry = () => {
    let privateKey = "0xc0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0de";
    let privateKeyN = "c0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0de";
    let privateKeyBuff = Buffer.from(privateKeyN, 'hex');
    console.log(privateKeyBuff.length);
    console.log(privateKeyBuff);
    let publicKeyBuffer = util.privateToPublic(privateKey);
    let publicKey = util.bufferToHex(publicKeyBuffer);
    let payerAddress = '0x' + util.bufferToHex(util.keccak256(publicKeyBuffer)).slice(26);
    let senderPrvKey = "0xa0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0ae";
    let senderPrvKeyN = "a0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0dec0ae";
    let senderPrvKeyBuff = Buffer.from(senderPrvKeyN, "hex");
    let senderPubKeyBuffer = util.privateToPublic(senderPrvKey);
    let senderPubKey = util.bufferToHex(publicKeyBuffer);
    let senderAddress = "0x" + util.bufferToHex(util.keccak256(publicKeyBuffer)).slice(26);
    console.log("Payer Address", payerAddress);
    let rawTx = {
        sender: senderAddress,
        nonce: web3.utils.toHex(0),
        gasPrice: web3.utils.toHex(20000000000),
        gasLimit: web3.utils.toHex(100000),
        to: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
        value: web3.utils.toHex(1000),
        data: "0xc0de"
    };
    let transaction = new tx.Transaction(rawTx);
    console.log(transaction.payerSign);
    transaction.payerSign(privateKeyBuff);
    console.log(transaction.toJSON());
    //0x53ae893e4b22d707943299a8d0c844df0e3d5557
};
exports.signTry();
//# sourceMappingURL=signer.js.map