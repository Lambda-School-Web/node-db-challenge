const db = require("../data/dbConfig");

module.exports = {
  getResources,
  getResourceById,
  insertResource
};

function getResources() {
  return db("resources");
}

function insertResource(resourceData) {
  return db("resources")
    .insert(resourceData)
    .then(([id]) => this.getResourceById(id));
}

function getResourceById(id) {
  return db("resources")
    .where({ id })
    .first();
}
