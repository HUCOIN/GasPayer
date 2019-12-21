"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const LocalStrategy = require("passport-local").Strategy;
const user_1 = require("../models/user");
// Session controller middleware used to determine auth before requests
exports.sessionController = (req, res, next) => {
    if (!req.user) {
        return res.send({ msg: "Login First", success: false });
    }
    else {
        next();
    }
};
// Given a user and a game name returns the index of this game in user model.
/**
 * Local Login NextFunction
 */
exports.loginScreen = (req, res, next) => {
    console.log("I am rendering");
    return res.render("login", { button1: "Login", button2: "Sign up" });
};
exports.signupScreen = (req, res, next) => {
    console.log("I am rendering");
    return res.render("signup", {});
};
exports.userLogin = (req, res, next) => {
    passport_1.default.authenticate("login", function (err, user, info) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            return res.send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            return res.send({ msg: "Successful login", success: true });
        });
    })(req, res, next);
};
/**
 * Serialize-Deserialize User
 */
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (id, done) {
    user_1.User.findById(id, function (err, user) {
        done(err, user);
    });
});
// Create User  request handler
exports.createUser = (req, res, next) => {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();
    if (password.length <= 5) {
        return res.send({
            msg: "Password Length Should Be Greater Than 5",
            success: false
        });
    }
    // Password criteria with min length 6 and includes a digit and a number
    // var letters = "[A-Za-z]";
    // var numbers = "[0-9]";
    // if (!password.match(letters) || !password.match(numbers)) {
    //   return res.send({
    //     msg: "Password Must Include A Digit And Letter",
    //     success: false
    //   });
    // }
    user_1.User.findOne({ email: email }, (err, user) => {
        if (err)
            throw err;
        if (user) {
            return res.send({ msg: "User Already Exists.", success: false });
        }
        else {
            const newUser = new user_1.User();
            newUser.generateHash(password).then((hash) => {
                newUser.password = hash;
                newUser.email = email;
                newUser.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                    exports.userLogin(req, res, next);
                });
            });
        }
    });
};
/**
 * Local Login Strategy
 */
passport_1.default.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, (username, password, done) => {
    username = username.toLowerCase();
    user_1.User.findOne({
        email: username
    }, (err, user) => {
        if (err)
            return done(err);
        if (!user)
            return done(null, false, {
                msg: "No Such User",
                success: false
            });
        user
            .comparePassword(password, user.password)
            .then((isMatch) => {
            if (!isMatch)
                return done(null, false, {
                    msg: "Wrong Password",
                    success: false
                });
            return done(null, user);
        });
    });
}));
exports.logout = (req, res, next) => {
    req.logout();
    return res.send({ success: true });
};
// Password change handle
