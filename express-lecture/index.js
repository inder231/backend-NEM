const express = require("express");
const app = express();
const fs = require("fs");
// we need this to pass json in post request
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/profile", (req, res) => {
  // name, age
  // welocome name
  // age > 18 eligible : not eligible
  const { name, age } = req.query;
  console.log(req.query.age);

  res.send(
    "Welcome" +
      name +
      "you are " +
      (Number(age) > 18 ? "Eligible" : "Not Eligible")
  );
});
app.get("/profile/:name", (req, res) => {
  console.log(req.params);
  const { name } = req.params;
  res.send("Welcome" + name);
});

// post request using express
app.post("/adddetails", (req, res) => {
  console.log(req.body);
  res.send("Thanks");
});

app.get("/products", (req, res) => {
  const data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
//   console.log(parsedData);
  res.send(parsedData);
});
app.post("/products/create", (req, res) => {
  // const payload = req.body;
  // FIRST GET ALL DATA
  // parse it
  // read
  // access data.products
  // add to prodcuts via push or spread etc
  // do not append  = write
  const payload = JSON.stringify(req.body);
  console.log(payload);
  const data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
  const products = parsedData.products;
  console.log(products);
  // products.push(JSON.parse(payload));
  const newProducts = [...products, JSON.parse(payload)];
  console.log(newProducts);
  parsedData.products = newProducts;
  fs.writeFileSync("./db.json", JSON.stringify(parsedData), "utf-8");
  // fs.appendFileSync("./db.json",payload,"utf-8")
  res.send("product created");
});

app.put("/products/:id", (req, res) => {
  // data to be updated;
  const id = req.params.id;
  console.log(id);
  const payload = req.body;
//   console.log(payload);
  const data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
  const products = parsedData.products;
  console.log(products);
  res.send("Product edited")
});

// method + route

app.listen(7000, () => {
  console.log(`app is running on 7000`);
});

/// CRUD - using express - files
/// CRUD - using express - using mongodb
/// CRUD - using express - using mongodb - authentication
/// CRUD - using express - using mongodb - authorization
