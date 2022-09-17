const express = require("express");
const { UserModel } = require("../models/User.model");
const signUpRoute = express.Router();

signUpRoute.post("/", async (req, res) => {
  const new_user = new UserModel(req.body);
  await new_user.save();
  res.send("Added");
});
module.exports = { signUpRoute };
