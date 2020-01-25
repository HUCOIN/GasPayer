import mongoose from "mongoose";
const Schema = mongoose.Schema;


export const contractSchema = new Schema({
  name: String,
  address: String,
  functions: [{body: String, payable: Boolean, inputs: {}}],
  userWallet: String,
  userMail: String,
});

export const userSchema = new Schema({
  email: String,
  password: String,
  contracts: [contractSchema],
  balance: Number
});


