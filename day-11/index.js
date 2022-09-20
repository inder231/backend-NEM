const express = require("express");
const connection = require("./config/db");
const loginroute = require("./routes/login.route");
const signuproute = require("./routes/signup.route");
require("dotenv").config();
const app = express();
app.use(express.json());


app.use("/signup", signuproute);
app.use("/login",loginroute)

app.get("/", (req, res) => {
  res.send("JWT");
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
