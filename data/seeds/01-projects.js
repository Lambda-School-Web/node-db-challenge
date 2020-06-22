exports.seed = function(knex) {
  return knex("projects").insert([
    { name: "Challenge Project", completed: 1 },
    { name: "Build Week Backend", completed: 0 },
    { name: "Labs", description: "Scary....", completed: 0 }
  ]);
};
