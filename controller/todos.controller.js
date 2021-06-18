const Todos = require("../model/todos.service");

async function createTodos(req, res, next) {
  try {
    const { title, description, status } = req.body;
    const todos = await Todos.forge({
      title,
      description,
      status,
      user: req.user.id,
    })
      .save()
      .then((data) => {
        res.send(data);
        next();
      })
      .catch((err) => {
        if (err.code === "ER_DUP_ENTRY") {
          next("email already taken");
        }
        next(err);
      });

    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
}

async function listTodos(req, res, next) {
  try {
    const todos = await Todos.where({ user: req.user.id })
      .fetchAll({
        columns: ["id", "title", "description", "status", "user"],
        require: false,
      })
      .then((data) => {
        res.send(data.serialize());
      })
      .catch((err) => {
        next("Invalid username");
      });
  } catch (err) {
    next(err);
  }
}

function deleteTodo(req, res, next) {
  Todos.where({ id: req.params.id })
    .destroy()
    .then((result) => {
      res.json({
        msg: "Task deleted",
      });
    })
    .catch((err) => {
      next(err);
    });
}

function updateTodo(req, res, next) {
  const { title, description, status } = req.body;
  Todos.where({ id: req.params.id })
    .save(
      {
        title,
        description,
        status,
      },
      {
        patch: true,
      }
    )
    .then((result) => {
      res.json({
        msg: result,
      });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { createTodos, listTodos, deleteTodo, updateTodo };
