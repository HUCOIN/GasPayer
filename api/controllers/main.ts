import express from "express";
export const a = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  next();
};
export const dashboard = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user: any = req.user;
  console.log("I am rendering");
  return res.render("dashboard", { balance: user.balance });
};
