exports.seed = function(knex) {
  return knex("resources").insert([
    { name: "James" },
    { name: "Team", description: "varies" },
    { name: "Computer" }
  ]);
};
