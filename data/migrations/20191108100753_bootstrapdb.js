exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.string("name", 255).notNullable();
      tbl.string("description", 255);
      tbl
        .integer("completed")
        .notNullable()
        .defaultTo(0);
    })
    .createTable("resources", tbl => {
      tbl.increments();
      tbl
        .string("name", 255)
        .notNullable()
        .unique();
      tbl.string("description", 255);
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.string("description", 255).notNullable();
      tbl.string("notes", 255);
      tbl
        .integer("completed")
        .notNullable()
        .defaultTo(0);
      tbl
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
    })
    .createTable("project_resources", tbl => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
      tbl
        .integer("resource_id")
        .unsigned()
        .references("id")
        .inTable("resources")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
