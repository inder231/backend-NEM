const express = require("express");
const { connection } = require("./config/db");
const { loginRouter } = require("./routes/login");
const { signupRouter } = require("./routes/signup");
const JWT = require("jsonwebtoken");
const passport = require("./config/google.oauth");
require("dotenv").config();

require("dotenv").config();
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("JWT");
});
app.get("/dashboard", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  JWT.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    console.log(decoded, "decoded");
    if (err) {
      res.send("Not authorized!");
    } else {
      res.send("Dahshboard data");
    }
  });
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
    session: false,
  })
);
app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server running on http://localhost:${port}`);
    console.log("connected to database!");
  } catch (error) {
    console.log("Not able to connect to database");
  }
});
