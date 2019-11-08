exports.seed = function(knex) {
  return knex("tasks").insert([
    {
      description: "Set up repo",
      notes: "fork, clone, set branch, install packages, init knex",
      project_id: 1
    },
    { description: "Code the thing", project_id: 1 },
    { description: "Submit", project_id: 1 },
    {
      description: "Set up repo",
      notes: "fork, clone, set branch, install packages, init knex",
      project_id: 2
    },
    { description: "Code the thing", project_id: 2 },
    { description: "Submit", project_id: 2 },
    {
      description: "Set up repo",
      notes: "fork, clone, set branch, install packages, init knex",
      project_id: 3
    },
    { description: "Code the thing", project_id: 3 },
    { description: "?????", project_id: 3 },
    { description: "Profit", project_id: 3 }
  ]);
};
