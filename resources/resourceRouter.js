const router = require("express").Router();
const middleware = require("./resourceMiddleware");
const db = require("./resourceModel");

router.get("/", async (req, res) => {
  try {
    const resources = await db.getResources();

    res.status(200).json(resources);
  } catch {
    res.status(500).json({ error: "Failed to retrieve list of resources" });
  }
});

router.post("/", middleware.validateResource, async (req, res) => {
  let resourceBody = { name: req.body.name };
  if (req.body.description)
    resourceBody = { ...resourceBody, description: req.body.description };

  console.log(resourceBody);
  try {
    const resource = await db.insertResource(resourceBody);

    res.status(201).json(resource);
  } catch {
    res.status(500).json({ error: "Failed to add the resource" });
  }
});

module.exports = router;
