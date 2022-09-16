const express = require("express");
const { signup } = require("../controllers/user");
const { UserModel } = require("../models/user");
const signupRouter = express.Router();

signupRouter.post("/",signup);
// signupRouter.post("/", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const new_user = new UserModel({ name, email, password });
//     await new_user.save();
//     res.status(201).send("User Added!");
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
module.exports = { signupRouter };
