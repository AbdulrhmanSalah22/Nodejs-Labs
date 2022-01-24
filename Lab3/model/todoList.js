const mongoose = require("mongoose");

const todoListSchema = new mongoose.Schema({
  title: String,
  descr: String
});

const TodoList = mongoose.model("todoList", todoListSchema);

module.exports = { TodoList };
