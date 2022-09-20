const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/UserModel");
const signupRouter = express.Router();

signupRouter.post(
  "/",
  [
    check("name", "Please enter a valid name").isLength({ min: 1 }),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter password atleast 8 characters long!"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({ message: errors.array()[0].msg });
      }
      const { name, email, password } = req.body;
      const user = await UserModel.findOne({ email });
      console.log(user);
      if (!user) {
        const salt = bcrypt.genSaltSync(8);
        const hashPassword = bcrypt.hashSync(password,salt);
        const new_user = await new UserModel({ name, email, password:hashPassword });
        await new_user.save();
        return res.status(201).send({
          success: true,
          message: "New User Created",
        });
      }else{
        return res.status(200).send({
            success:false,
            message:"User Already Exist, Use another email!"
        })
      }
    } catch (error) {
      res.send("SignUp failed!"+error);
    }
  }
);
module.exports = { signupRouter };
