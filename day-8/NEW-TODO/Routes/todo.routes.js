const express = require("express");
const { TodoModel } = require("../Models/TodoModel");
const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
  let { limit = 10, page = 1, q } = req.query;
  const limitRecords = parseInt(limit);
  const skip = (page - 1) * limit;
  let query = {};
  if (q) {
    query = { $text: { $search: q } };
  }
  try {
    const data = await TodoModel.find(query).limit(limitRecords).skip(skip);
    res.send({ page: page, limit: limitRecords, todos: data });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});
todoRouter.post("/create", async (req, res) => {
  const payload = req.body;
  //   console.log(payload);
  const new_todo = new TodoModel(payload);
  try {
    await new_todo.save();
    res.status(201).send("New todo added successfully");
  } catch (error) {
    res.status(404).send(error);
  }
});
todoRouter.patch("/:todoId", async (req, res) => {
  const id = req.params.todoId;
  const payload = req.body;
  try {
    await TodoModel.updateOne(
      { _id: id },
      { $set: { title: req.body.title, status: req.body.status } }
    );
    res.status(201).send("Updated");
  } catch (error) {
    res.status(404).send(error);
  }
});
todoRouter.delete("/:todoId", async (req, res) => {
  const id = req.params.todoId;
  try {
    await TodoModel.deleteOne({ _id: id });
    res.status(200).send("Deleted");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = { todoRouter };
