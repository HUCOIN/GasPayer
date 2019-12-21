import passport from "passport";
import express from "express";
const LocalStrategy = require("passport-local").Strategy;
import { User, IUserModel } from "../models/user";
import pug from "pug";
import { randomBytes } from "crypto";
import { reset } from "nodemon";

// Session controller middleware used to determine auth before requests
export const sessionController = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.user) {
    return res.send({ msg: "Login First", success: false });
  } else {
    next();
  }
};

// Given a user and a game name returns the index of this game in user model.


/**
 * Local Login NextFunction
 */

export const loginScreen = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("I am rendering");
  return res.render("login", { button1: "Login", button2: "Sign up" });
}

export const signupScreen = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("I am rendering");
  return res.render("signup", {});
}

export const userLogin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  passport.authenticate("login", function (err, user, info) {
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
passport.serializeUser(function (user: IUserModel, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user: IUserModel) {
    done(err, user);
  });
});
// Create User  request handler
export const createUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const email: string = req.body.email.trim().toLowerCase();
  const password: string = req.body.password.trim();
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
  User.findOne({ email: email }, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.send({ msg: "User Already Exists.", success: false });
    } else {
      const newUser = new User();
      newUser.generateHash(password).then((hash: string) => {
        newUser.password = hash;
        newUser.email = email;
        newUser.save((err: any) => {
          if (err) {
            console.log(err);
          }
          userLogin(req, res, next);
        });
      });
    }
  });
};




/**
 * Local Login Strategy
 */
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (username: string, password: string, done: CallableFunction) => {
      username = username.toLowerCase();
      User.findOne(
        {
          email: username
        },
        (err, user) => {
          if (err) return done(err);
          if (!user)
            return done(null, false, {
              msg: "No Such User",
              success: false
            });
          user
            .comparePassword(password, user.password)
            .then((isMatch: Boolean) => {
              if (!isMatch)
                return done(null, false, {
                  msg: "Wrong Password",
                  success: false
                });
              return done(null, user);
            });
        }
      );
    }
  )
);

export const logout = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  req.logout();
  return res.send({ success: true });
};

// Password change handle
