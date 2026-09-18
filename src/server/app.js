const express = require("express");
const { route } = require("../routes/usre.routes");
const app = express();

app.use(express.json());

// Users api mount point
app.use("/api", route);

module.exports = app;
