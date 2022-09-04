const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const bodyParser = require("body-parser");

const host = "localhost";
const port = 8000;
const app = express();

// creating server

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

// ================= GET ================ request to /todos =======
app.get("/todos", (req, res) => {
  let todos = fs.readFileSync("./db.json", { encoding: "utf-8" });
  todos = JSON.parse(todos);
  //   console.log(todos);
  res.send(todos);
});
// ================================================================

// =================== POST POST POST POST POST ============= request to /todos========
app.post("/todos", (req, res) => {
  const payload = req.body;
  // reading db.json
  const data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  // converting back to normal form stringified version
  const parsedData = JSON.parse(data);
  // todos from data
  const todos = parsedData.todos;
  // creating newt todo
  const newTodo = { ...payload, id:uuidv4() };
  // adding new todo to database i.e db.json
  const newTodos = [...todos, newTodo];
  // setting new todos
  parsedData.todos = newTodos;
  // we writing the database i.e db.json
  fs.writeFileSync("./db.json", JSON.stringify(parsedData), {
    encoding: "utf-8",
  });
  res.send(parsedData);
});
// ===============================================================

// ==================== PUT PUT PUT PUT PUT =============== request ==============
app.patch("/todos/:id", (req, res) => {
  let { id } = req.params;
  const payload = req.body;
  console.log(payload);
  // reading data
  const data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
  const todos = parsedData.todos;
  const isIdPresent = todos.some((item) => item.id == id);
  // id = isIdPresent ? id : uuidv4();
  // console.log(isIdPresent,id)
  const oldTodo = todos.find((item) => item.id == id);
  // console.log(oldTodo,"old",isIdPresent);
  let newTodo;
  if (oldTodo !== undefined) {
    newTodo = { ...oldTodo, id, ...payload };
  } else {
    newTodo = { ...payload, id };
  }
  let newTodos;
  if (isIdPresent) {
    newTodos = todos.map((item) => {
      if (item.id == id) {
        return newTodo;
      }
      return item;
    });
  } else {
    newTodos = [...todos, newTodo];
  }
  parsedData.todos = newTodos;
  fs.writeFileSync("./db.json", JSON.stringify(parsedData), {
    encoding: "utf-8",
  });
  res.send(parsedData);
});
// ================================================================

// ========= DELETING === todo ====================================
app.delete("/todos/:id", (req, res) => {
  let { id } = req.params;
  // id = Number(id);
  // console.log(id);
  const data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
  const todos = parsedData.todos;
  const newTodos = todos.filter((item) => item.id != id);
  // console.log(newTodos);
  parsedData.todos = newTodos;
  fs.writeFileSync("./db.json", JSON.stringify(parsedData), {
    encoding: "utf-8",
  });
  console.log(parsedData);
  res.send(parsedData);
});
//=================================================================
// =================== listening to app ============================
app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}/todos`);
});
// ================================================================
