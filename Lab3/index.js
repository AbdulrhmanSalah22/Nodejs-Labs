const mongoose = require("mongoose");
const express = require("express");
const { TodoList } = require("./model/todoList");

const app = express();

// middleware
app.use(express.json());

app.get("/todoList", async (req, res) => {
  const lists = await TodoList.find()
  res.json(lists)
})

app.get("/todoList/:id", async (req, res) => {
  const list = await TodoList.findById(req.params.id);
  res.json(list)
})

app.post("/todoList", async (req, res) => {
  const newList = new TodoList(req.body)
  const result = await newList.save()
  res.json(result)
});

app.put("/todoList/:id", async (req, res) => {
  const list = await TodoList.findById(req.params.id);
  list.title = req.body.title
  list.descr = req.body.descr
  await list.save();
  res.json(list)
})

app.delete("/todoList/:id", async (req, res) => {
  const result = await TodoList.findByIdAndDelete(req.params.id);
  res.json(result)
})

//connection to database
mongoose
  .connect("mongodb://localhost/todoList")
  .then(async () => {
    console.log("successfully connected to mongodb");
    // start backend erver
    app.listen(3000, () => {
      console.log("Server listeing on port 30004");
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
