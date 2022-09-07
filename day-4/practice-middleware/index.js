const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const port = 8000;
const whitelist = ["http://localhost:8000", "http://localhost:8000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(morgan("common"));
app.use(helmet());
app.use(cors({
    origin:'http://localhost:3000'
}));

app.get("/", (req, res) => {
  res.json({
    message: "Hello Stranger! How are you?",
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
