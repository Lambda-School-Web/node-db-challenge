const db = require("../data/dbConfig");

module.exports = {
  getProjects,
  getProjectById,
  insertProject,
  insertTask,
  getTasks,
  getTaskById
};

function getProjects() {
  return db("projects").then(projects => {
    if (projects.length > 0) {
      return projects.map(project => {
        return { ...project, completed: Boolean(project.completed) };
      });
    }
  });
}

function getProjectById(id) {
  return db("projects")
    .where({ id })
    .first()
    .then(project => {
      if (project) {
        if (project.completed) {
          return { ...project, completed: true };
        } else {
          return { ...project, completed: false };
        }
      } else {
        return null;
      }
    });
}

function insertProject(projectData) {
  return db("projects")
    .insert(projectData)
    .then(([id]) => this.getProjectById(id));
}

function getTasks(id) {
  return db("tasks")
    .select("id", "description", "notes", "completed")
    .where("project_id", id)
    .then(tasks => {
      console.log(tasks);

      if (tasks.length > 0) {
        return tasks.map(task => {
          return { ...task, completed: Boolean(task.completed) };
        });
      }
    });
}
function insertTask(id, taskData) {
  return db("tasks")
    .insert({ ...taskData, project_id: id })
    .then(([taskID]) => this.getTaskById(taskID));
}

function getTaskById(id) {
  return db("tasks")
    .where({ id })
    .first()
    .then(task => ({ ...task, completed: Boolean(task.completed) }));
}
