const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");
require("dotenv").config();

const authorization = (roles) => async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (roles.includes(user.role)) {
    next();
  } else {
    return res.send("Not authorized!");
  }
};
module.exports = { authorization };
