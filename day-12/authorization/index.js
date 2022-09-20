const express = require("express");
const connection = require("./config/db");
const loginroute = require("./routes/login.route");
const signuproute = require("./routes/signup.route");
const JWT = require("jsonwebtoken");
const SignUpModel = require("./models/User");
const authentication = require("./middlewares/authentication");
const authorization = require("./middlewares/authorization");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/signup", signuproute);
app.use("/login", loginroute);

app.get("/", (req, res) => {
  res.send("JWT");
});
app.get("/products", authentication, (req, res) => {
  return res.send("Here are the produtadl");
});
// admin seller
app.post("/product/create", authentication,authorization(["admin,seller"]), (req, res) => {

  return res.send("Product craeted");
});
// admin
app.delete("/product/:productId", authentication,authorization(["admin"]), (req, res) => {

  return res.send("Product craeted");
});

























app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB!");
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.log("Something went wrong!", error);
  }
});
