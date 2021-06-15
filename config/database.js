// const knex = require("knex")({
//   client: "mysql",
//   connection: {
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "todo",
//     charset: "utf8",
//   },
// });

const knex = require("knex");
const knexFile = require("./knexfile");

const db = knex(knexFile.development);
const bookshelf = require("bookshelf")(db);
module.exports = bookshelf;
