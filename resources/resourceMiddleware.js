const db = require("./resourceModel");
module.exports = { validateResource };

async function validateResource(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide the required name field" });
  } else {
    next();
  }
}
