// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: "todo-nodejs",
      user: "root",
      password: null,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
