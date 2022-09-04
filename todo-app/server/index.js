const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
// app.use(cors)
// adding middleware body-parser json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get request
app.get("/todos", (req, res) => {
  let todos = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedTodos = JSON.parse(todos);
  res.send(parsedTodos);
});
// post request
app.post("/todos", (req, res) => {
  let payload = req.body;
  console.log(payload);
  // let result = JSON.stringify(payload);
  const data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const oldParsedData = JSON.parse(data);
  const parsedTodos = oldParsedData.todos;
  const newTodos = [...parsedTodos,{...payload,id:uuidv4()}];
  oldParsedData.todos = newTodos;
  // console.log(newTodos);
  fs.writeFileSync("./db.json", JSON.stringify(oldParsedData), "utf-8");
  res.send(oldParsedData);
});
// put request
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  let payload = req.body;
  // console.log(payload);
  const data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
  // let dataToUpdate = parsedData.todos.find((item)=>{return item.id==id});

  const todos = parsedData.todos;
  const isTodoPresent = todos.some((item) => item.id == id);
  let newTodos;
  isTodoPresent
    ? (newTodos = todos.map((item) => {
        if (item.id == id) {
          return { id: Number(id), title: payload.title };
        } else return item;
      }))
    : (newTodos = [...todos, { id, title: payload.title }]);
  parsedData.todos = newTodos;
  fs.writeFileSync("./db.json", JSON.stringify(parsedData), "utf-8");
  res.send(parsedData);
});
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
  const todos = parsedData.todos;
  const isTodoPresent = todos.some((ele) => ele.id == id);
  // console.log(isTodoPresent,todos)
  let newTodos = isTodoPresent && todos.filter((item) => item.id !== id);
  // console.log(newTodos);
  parsedData.todos = newTodos;
  fs.writeFileSync("./db.json", JSON.stringify(parsedData), "utf-8");
  res.send(parsedData);
});
const PORT = process.env.PORT || 8000;
// listening to app
app.listen(PORT, () => {
  console.log(`App is running on port http://localhost:${PORT}`);
});
