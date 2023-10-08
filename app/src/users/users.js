const usersCrudRouter = require("./routers/users_crud");
const express = require("express");
const usersRouter = express.Router();

usersRouter.use("/", usersCrudRouter);

module.exports = usersRouter;
