const express = require("express");
// const moviesRouter = require("./movies.route");
const port = 8000;
const app = express();
app.use(express.json());
// app.use("movies",moviesRouter)
let moviesChecker = (req, res, next) => {
  let { ID, Name, Rating, Description, Genre, Cast } = req.body;
  if (
    typeof ID === "number" &&
    typeof Name === "string" &&
    typeof Rating === "number" &&
    typeof Description === "string" &&
    typeof Genre === "string" &&
    typeof Cast === "string"
  ) {
    console.log("Received data");
    next();
  } else {
    res.send("404");
  }
};

app.get("/", (req, res) => {
  res.send("Movies");
});
app.post("/movies/create", moviesChecker, (req, res) => {
  res.send("MOVIE ADDED TO DATABASE");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
