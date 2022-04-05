const cors = require("cors");
const errorHandler = require("./errors/errorHandler");
const express = require("express");
const notFound = require("./errors/notFound");

const usersRouter = require("./users/users.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;