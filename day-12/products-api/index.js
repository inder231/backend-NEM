const express = require("express");
const { connection } = require("./config/db");
const { loginRouter } = require("./routes/login");
const { productRouter } = require("./routes/product");
const { signupRouter } = require("./routes/signup");
const { router } = require("./routes/user");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// middlewares
app.use(express.json());
// ====================
app.get("/", (req, res) => {
  console.log("AUTH and CRUD");
});
// routes

// SIGNUP
app.use("/signup", signupRouter);
// LOGIN
app.use("/login", loginRouter);
// PRODUCTS
app.use("/user", productRouter);
// AUTH 
app.use("/auth",router)
// =====


// listening to server
app.listen(port, async () => {
  try {
    await connection;
    console.log(
      `Server is running on http://localhost:${port} and connected to DB products`
    );
  } catch (error) {
    console.log(`Server connnection failed`);
  }
});
