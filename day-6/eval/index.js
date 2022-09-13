const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  console.log(req.method, req.route, req.headers["user-agent"]);
  fs.appendFileSync(
    "./logs.txt",
    req.method + " " + req.route + " " + req.headers["user-agent"] + "\r\n",
    "utf-8"
  );
  next();
});
const gaurd = (req, res, next) => {
  if (req.query.password === "54123") {
    next();
  } else {
    res.send("Give correct password losser!");
  }
};

const validator = (req, res, next) => {
  const { id, title, content, author } = req.body;
  console.log(typeof id, typeof title, typeof content, typeof author);
  if (
    id &&
    typeof id === "number" &&
    title &&
    typeof title === "string" &&
    content &&
    typeof content === "string" &&
    author &&
    typeof author === "string"
  ) {
    next();
  } else {
    res.send("Please enter correct field with correct data types");
  }
};
app.get("/", (req, res) => {
  res.send("CRUD WITH MIDDLEWARES");
});
app.get("/posts", (req, res) => {
  const data = fs.readFileSync("./posts.json", { encoding: "utf-8" });
  console.log(data);
  res.send(data);
});
app.post("/posts/create", validator, (req, res) => {
  console.log(req.body);
  const data = fs.readFileSync("./posts.json", "utf-8");
  const payload = req.body;
  const parsedData = JSON.parse(data);
  let posts = parsedData.posts;
  let newPosts = [...posts, payload];
  parsedData.posts = newPosts;
  fs.writeFileSync("./posts.json", JSON.stringify(parsedData), {
    encoding: "utf-8",
  });
  res.send("Added");
});
app.patch("/posts/:postId", gaurd, (req, res) => {
  let id = req.params.postId;
  id = Number(id);
  const payload = req.body;
  const data = fs.readFileSync("./posts.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
  const posts = parsedData.posts;
  let isIdPresent = posts.some((ele) => ele.id === id);
  let newPosts;
  let newPost;
  if (!isIdPresent) {
    newPost = payload;
    newPosts = [...posts, newPost];
  } else {
    let prevPost = posts.find((ele) => ele.id === id);
    console.log(prevPost);
    newPost = { ...prevPost, ...payload };
    newPosts = posts.map((ele) => (ele.id === id ? newPost : ele));
  }
  parsedData.posts = newPosts;
  fs.writeFileSync("./posts.json", JSON.stringify(parsedData), {
    encoding: "utf-8",
  });
  res.send("Updated");
});
app.delete("/posts/:postId", gaurd, (req, res) => {
  let id = req.params.postId;
  id = Number(id);
  const data = fs.readFileSync("./posts.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
  const posts = parsedData.posts;
  let isIdPresent = posts.some((ele) => ele.id === id);
  let newPosts;
  if (isIdPresent === true) {
    newPosts = posts.filter((ele) => ele.id !== id);
    parsedData.posts = newPosts;
    fs.writeFileSync("./posts.json", JSON.stringify(parsedData), {
      encoding: "utf-8",
    });
    res.send("Deleted");
  } else{
    res.send("No such post present");
  }
});

app.listen(8080, () => {
  console.log(`Running on http://localhost:8080`);
});
