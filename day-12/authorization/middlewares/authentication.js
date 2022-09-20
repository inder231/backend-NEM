const JWT = require("jsonwebtoken");
require("dotenv").config();
const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send("Please login again!");
  }
  const token = req.headers?.authorization?.split(" ")[1];
  JWT.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.send("Please login");
    } else {
      req.body.email = decoded.email;
      next();
    }
  });
};
module.exports = authentication;
