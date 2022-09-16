const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connection } = require("./config/db");
const { signupRouter } = require("./routes/signup.route");
const PORT = process.env.PORT || 8080;

// Use middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// routes
// signup route 
app.use("/signup",signupRouter);




app.get("/", (req, res) => {
    res.send("Welcome to Auth-App!");
});



// starting the server
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Connected to database!");
  } catch (error) {
    console.log("Something went wrong", error);
  }
});
