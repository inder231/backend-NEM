const express = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const SignUpModel = require("../models/user.signmodel");

const signuproute = express.Router();
signuproute.post(
  "/",
  [
    check("name", "Please provide name atleast four characters long.").isLength(
      { min: 4 }
    ),
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Please provide password atleast 10 characters long!"
    ).isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()[0].msg,
        });
      }
      const isUserPresent = await SignUpModel.find({ email });
      if (isUserPresent.length == 0) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password, salt);
        const new_user = await new SignUpModel({
          name,
          email,
          password: hashedPass,
        });
        console.log(new_user);
        new_user.save();
        res.status(201).send("User Added Successfully!");
      } else {
        res.send("Email already exist!");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);
module.exports = signuproute;
