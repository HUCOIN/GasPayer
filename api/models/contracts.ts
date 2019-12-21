import { contractInterface } from "./modelInterfaces";
import mongoose from "mongoose";
import {contractSchema } from "./schemas";

interface IContractModel extends contractInterface, mongoose.Document {}
let Contract = mongoose.model<IContractModel>("Contract", contractSchema);
export { Contract };
export { IContractModel };