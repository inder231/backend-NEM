const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/signup");
require('dotenv').config();
const loginRouter = express.Router();

loginRouter.post(
  "/",
  [
    check("email", "Please enter a valid email.").isEmail(),
    check(
      "password",
      "Please enter password atleast 10 characters long!"
    ).isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          msg: errors.array()[0].msg,
        });
      }
      const user = await UserModel.findOne({ email });
      // console.log(user);
      let hash = user.password;
      bcrypt.compare(password, hash, function (err, result) {
        if (result) {
          var token = JWT.sign({ email }, process.env.SECRET_KEY,{expiresIn:3600});
          res.send({ msg: "Login successfull", token: token });
        } else {
          res.send("Login failed, invalid credentials!");
        }
      });
    } catch (error) {
      res.send("Login Failed!");
    }
  }
);
module.exports = { loginRouter };