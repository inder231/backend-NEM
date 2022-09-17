const express = require("express");
const { check, validationResult } = require("express-validator");
const { UserModel } = require("../models/signup");
const bcrypt = require("bcrypt");

const signupRouter = express.Router();

signupRouter.post(
  "/",
  [
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
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      if (isUserPresent.length === 0) {
        const new_user = await new UserModel({
          name,
          email,
          password: hashedPassword,
        });
        new_user.save();
        res.status(201).send("Added successfully!");
      } else {
        res.send("Please try another email!, it's already taken.");
      }
    } catch (error) {
      res.send(error);
    }
  }
);
module.exports = { signupRouter };
