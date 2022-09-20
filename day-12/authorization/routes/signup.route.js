const express = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const UserModel = require("../models/User");

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
      const isUserPresent = await UserModel.find({ email });
      if (isUserPresent.length == 0) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password, salt);
        const new_user = await new UserModel({
          name,
          email,
          password: hashedPass,
        });
        // console.log(new_user);
        await new_user.save();
        return res.status(201).send("User Added Successfully!");
      } else {
        return res.send("Email already exist!");
      }
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }
);
module.exports = signuproute;
