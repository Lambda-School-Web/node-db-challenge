const router = require("express").Router();
const middleware = require("./projectMiddleware");
const db = require("./projectModel");

router.get("/", async (req, res) => {
  try {
    const projects = await db.getProjects();

    res.status(200).json(projects);
  } catch {
    res.status(500).json({ error: "Failed to retrieve the list of projects" });
  }
});

router.post("/", middleware.validateProject, async (req, res) => {
  let projectBody = { name: req.body.name };
  if (req.body.description)
    projectBody = { ...projectBody, description: req.body.description };
  if (req.body.completed) {
    projectBody["completed"] = 1;
  }
  console.log(projectBody);
  try {
    const project = await db.insertProject(projectBody);

    res.status(201).json(project);
  } catch {
    res.status(500).json({ error: "Failed to add the project" });
  }
});

router.get("/:id/tasks", middleware.validateID, async (req, res) => {
  try {
    const tasks = await db.getTasks(req.params.id);

    tasks && tasks.length > 0
      ? res.status(200).json(tasks)
      : res
          .status(200)
          .json({ message: "This project currently has no tasks" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Failed to retrieve the list of tasks for that project" });
  }
});

router.post(
  "/:id/tasks",
  middleware.validateID,
  middleware.validateTask,
  async (req, res) => {
    let taskBody = { description: req.body.description };
    if (req.body.notes) taskBody = { ...taskBody, notes: req.body.notes };
    if (req.body.completed) {
      taskBody["completed"] = 1;
    }
    try {
      console.log(taskBody);
      const task = await db.insertTask(req.params.id, taskBody);

      res.status(200).json(task);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to add the task" });
    }
  }
);

module.exports = router;
