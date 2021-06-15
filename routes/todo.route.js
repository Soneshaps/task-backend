const express = require("express");

const router = express.Router();

const {
  createTodos,
  listTodos,
  deleteTodo,
  updateTodo,
} = require("../controller/todos.controller");

router.post("/", createTodos);

router.get("/", listTodos);

router.delete("/:id", deleteTodo);

router.put("/:id", updateTodo);

module.exports = router;
