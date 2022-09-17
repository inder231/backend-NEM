const express = require("express");
require('dotenv').config();
const { connection } = require("./config/db");
// const { signUpRoute } = require("./routes/signup.routes");
const PORT = process.env.PORT||8080
const app = express();
app.use(express.json());
// app.use("/signup",signUpRoute);



app.get("/", (req, res) => {
  res.send("Welcome to homepage!");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log("couldn't connect to db");
  }
});
