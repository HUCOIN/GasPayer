"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const schemas_1 = require("./schemas");
/*
 * Generate Salt and Hash
 */
schemas_1.userSchema.methods.generateHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.genSalt(10, (err, salt) => {
            if (err)
                reject(err);
            bcrypt_1.default.hash(password, salt, (err, hash) => {
                if (err)
                    reject(err);
                resolve(hash);
            });
        });
    });
};
/**
 *Compare Password and Hash
 */
schemas_1.userSchema.methods.comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, hash, (err, res) => {
            if (err)
                reject(err);
            if (res)
                resolve(true);
            else
                resolve(false);
        });
    });
};
let User = mongoose_1.default.model("User", schemas_1.userSchema);
exports.User = User;
