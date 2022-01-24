const express = require("express");
const uid = require("uuid");
const app = express();

arId = [ uid.v4 , uid.v4 , uid.v4 , uid.v5 ];
// const users = [
//     { id: 1, name: "Ahmed" },
//     { id: 2, name: "Ali" },
//     { id: 3, name: "Andrew" },
//     { id: 4, name: "Merna" },
// ]
//Dummy DataBase
const todoList = [
  {
    id: 1,
    title: "List1",
    descr: "List About Product1",
  },
  {
    id: 2,
    title: "List2",
    descr: "List About Product2",
  },
];
var id = 0 ;

//middleware
app.use(express.json());

app.get("/todoList", (req, res) => {
  res.json(todoList);
});

app.get("/get1todoList/:id", (req, res) => {
  const li = todoList.find((List) => List.id === +req.params.id);
  const arr = [];
  arr.push({"id" : li.id,"title" :li.title})
  res.json(arr)
});

app.post("/todoList", (req, res) => {
  let item = req.body ;
  item['id'] = id++ ;
  todoList.push(item);
  res.json(todoList);
});

app.delete("/deltodoList/:id", (req, res) => {
   const delList = todoList.find((List) => List.id === +req.params.id);
   res.json(todoList.splice(delList.id--,1));
});

app.put("/todoList/:id", (req, res) => {
   const up = todoList.find((List) => List.id === +req.params.id);
   up.id = +req.body.id ;
   up.title = req.body.title;
   up.descr = req.body.descr ;
   res.json(up);
});

app.listen(3000);
