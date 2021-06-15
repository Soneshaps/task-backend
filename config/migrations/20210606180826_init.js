exports.up = function (knex) {
  return knex.schema.createTable("todos", (table) => {
    table.increments("id");
    table.string("collection").notNullable();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.string("status").notNullable();
    table.string("user").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
