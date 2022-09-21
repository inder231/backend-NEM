const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../models/UserModel");
const userController = Router();

userController.post("/signup", async (req, res) => {
  try {
    const { email, password, age } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(404).send({
        error: "Email already exists",
        message: "  Please enter a new email address.",
        success:false
      });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    if (!hashPassword)
      return res.status(403).send({ message: "Invalid password" });
    const new_user = new UserModel({
      email,
      password: hashPassword,
      age,
    });
    await new_user.save();
    return res.status(201).send({
      message: "User saved successfully",
      success: true,
      user: new_user,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});
userController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User note found", success: false });
    }
    const hash = user.password;
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      return res
        .status(403)
        .send({ message: "Wrong password!", success: false });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: 3600,
    });
    res.status(200).send({ message: "Login successful", success: true, token });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});

module.exports = { userController };
