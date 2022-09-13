const express = require("express");
const productsRouter = require("./products.routes.js")
const port = 8000;

const app = express();
app.use(express.json());
app.use("/products",productsRouter);



const timeLogger = (req, res, next) => {
  const startTime = new Date().getTime();
  console.log(startTime);
  next();
  const endTime = new Date().getTime();
  console.log(endTime);
  console.log(endTime - startTime);
};
const welcomeLogger = (req, res, next) => {
  console.log("welcome");
  next();
  console.log("Bye");
};
// app.use(timeLogger);
// app.use(welcomeLogger);
// app.use(timeLogger,welcomeLogger);

app.get("/", welcomeLogger, (req, res) => {
  res.send("homepage");
});
app.get("/about", (req, res) => {
  res.send("about");
});
app.get("/contact", timeLogger, (req, res) => {
  res.send("contact");
});
app.listen(8000, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
// middleware -
