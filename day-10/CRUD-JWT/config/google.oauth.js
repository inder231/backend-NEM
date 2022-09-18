const JWT = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/signup");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, cb) {
      let email = profile._json.email;
      let password = profile._json.name;
      var token = JWT.sign({ email }, process.env.SECRET_KEY, {
        expiresIn: 3600,
      });
      const salt = bcrypt.genSaltSync(10);
      let hashpassword = bcrypt.hashSync(password, salt);
      const user = new UserModel({
        name: profile._json.name,
        email,
        password: hashpassword,
      });
      await user.save();
      const payload = {
        email,
        password,
        url: profile._json.picture,
      };
      console.log(payload);
      return;
      
    }
  )
);
module.exports = passport;
