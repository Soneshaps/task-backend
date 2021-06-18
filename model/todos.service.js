const bookshelf = require("../config/database");

const Todos = bookshelf.model(
  "Todos",
  {
    tableName: "todos",
  },
  {
    addTodo: function (title, description, status, id) {
      return this.forge({
        title: title,
        description: description,
        status: status,
        user: req.user.id,
      }).save();
    },
    getTodo: function (id) {
      return this.where({ user: id }).fetchAll({
        columns: ["id", "collection", "title", "description", "status", "user"],
        require: false,
      });
    },
  }
);

module.exports = Todos;
