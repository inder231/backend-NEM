const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./Config/db.js");
const { TopicRouter } = require("./Routes/topic.routes");
const { IaRouter } = require("./Routes/ia.routes.js");
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use("/topics", TopicRouter);
app.use("/ias", IaRouter);

app.get("/", (req, res) => {
  res.send("Welcome to MVC");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(
      `Connected to DB successfully on port http://localhost:${PORT}`
    );
  } catch (err) {
    console.log("Something went wrong with DB");
  }
});
