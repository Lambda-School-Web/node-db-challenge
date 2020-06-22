const db = require("./projectModel");
module.exports = { validateID, validateProject, validateTask };

async function validateID(req, res, next) {
  try {
    const project = await db.getProjectById(req.params.id);

    project
      ? next()
      : res.status(404).json({ message: "There's no project with that ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve project with that ID" });
  }
}

async function validateProject(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide the required name field" });
  } else {
    next();
  }
}

async function validateTask(req, res, next) {
  if (!req.body.description) {
    res
      .status(400)
      .json({ message: "Please provide the required description field" });
  } else {
    next();
  }
}
