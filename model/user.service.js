const bookshelf = require("../config/database");

bookshelf.plugin("registry");

const Users = bookshelf.model(
  "Users",
  {
    tableName: "users",
    todo: function () {
      return this.hasMany("Todos");
    },
  },
  {
    addUser: function (username, email, password) {
      return this.forge({
        username: username,
        email: email,
        password: password,
      }).save();
    },
    getUser: function (email) {
      return this.where({ email: email }).fetch({
        column: ["id", "email", "password"],
        require: false,
      });
    },
  }
);

module.exports = Users;
