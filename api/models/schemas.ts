import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const contractSchema = new Schema({
  name: String,
  address: String,
  functionName: String,
  parameters: Object,
  paymentAmount: Number,
  userWallet: String,
  userMail: String,
  isPaid: { type: Boolean, default: false },
  isFunctionPayable: Boolean,
  returnValue:String
});

export const userSchema = new Schema({
  email: String,
  password: String,
  contracts: [contractSchema],
  balance: Number
});
