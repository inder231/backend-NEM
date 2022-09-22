const express = require("express");
const { connection } = require("./config/db");
const { authentication } = require("./middlewares/authentication");
const { notesController } = require("./routes/note.routes");
const { userController } = require("./routes/user.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

// middlewares
app.use(express.json());
// ====================
app.get("/", (req, res) => {
  console.log("NOTES-APP");
});
// routes
app.use("/user", userController);
// Need to use authentication only for Notes Routes so Using after the userController
app.use(authentication);
app.use("/notes", notesController);

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
