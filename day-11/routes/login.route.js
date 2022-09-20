const expres = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const loginroute = expres.Router();

const { check, validationResult } = require("express-validator");
const SignUpModel = require("../models/user.signmodel");

loginroute.post(
  "/",
  [
    check("email", "Please enter valid email").isEmail(),
    check(
      "password",
      "Please enter password atleast 10 characters long"
    ).isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({
          msg: errors.array()[0].msg,
        });
      }
      const user = await SignUpModel.findOne({ email });
      console.log(user);
      let hash = user.password;
      bcrypt.compare(password, hash, (err, result) => {
        if (result) {
          const token = JWT.sign({ email }, process.env.SECRET_KEY, {
            expiresIn: 3600,
          });
          res.send({ msg: "Login successfull", token: token });
        } else {
          res.send("Login failed, invalid credentials!");
        }
      });
    } catch (err) {
      res.send("login failed",err);
    }
  }
);
module.exports = loginroute;
