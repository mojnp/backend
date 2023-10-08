const usersCrudRouter = require("./routers/usersCrud");
const express = require("express");

const usersRouter = express.Router();

usersRouter.use("/", usersCrudRouter);

module.exports = usersRouter;
