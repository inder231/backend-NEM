const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});
const TodoModel = mongoose.model('todo', todoSchema);
module.exports = { TodoModel };
