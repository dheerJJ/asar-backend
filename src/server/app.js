const express = require("express");
const router = require("../routes/user.routes");
const app = express();

app.use(express.json());

// Users api mount point
app.use("/api", router);

module.exports = app;
