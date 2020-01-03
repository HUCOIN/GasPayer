"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = (req, res, next) => {
    next();
};
exports.dashboard = (req, res, next) => {
    const user = req.user;
    console.log("I am rendering");
    return res.render("dashboard", { balance: user.balance });
};
//# sourceMappingURL=main.js.map