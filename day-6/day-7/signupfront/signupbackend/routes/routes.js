const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/signupmodels");
const bcrypt = require('bcrypt');

router.post("/signup", async (req, res) => {

  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password,saltPassword)

  const signupUser = new signUpTemplateCopy({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: securePassword,
  });
  signupUser
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
