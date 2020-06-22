const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const projectRouter = require("./projects/projectRouter");
const resourceRouter = require("./resources/resourceRouter");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/resources", resourceRouter);

module.exports = server;
