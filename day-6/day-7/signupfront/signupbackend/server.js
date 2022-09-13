const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

const app = express();
const mongoose = require("mongoose");
const routerUrls = require("./routes/routes");

dotenv.config();
const PORT = process.env.PORT || 8080;

const connection = mongoose.connect(process.env.DATABASE_ACCESS, () => {
  console.log(`Database connected! with Server on running on http://localhost:${PORT}`);
});

app.use(express.json());
app.use(cors());
app.use("/app", routerUrls);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    console.log("Error", err);
  }
});
