const express = require("express");
const cors = require('cors');
const { connection } = require("./Config/db");
const { todoRouter } = require("./Routes/todo.routes");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;

app.use("/todos",todoRouter);

app.get("/", (req, res) => {
  res.send("todo-crud");
});
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to database!")
    console.log(`Server is on http://localhost:${PORT}`);
  } catch (error) {
    console.log("Error", error);
  }
});
