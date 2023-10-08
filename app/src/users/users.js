const express = require("express");
const usersRouter = express.Router();

const usersCrudRouter = require("../src/users/routers/users_crud");
const usersActionsRouter = require("../src/users/routers/users_actions");

usersRouter.use("/crud", usersCrudRouter);
usersRouter.use("/actions", usersActionsRouter);

module.exports = usersRouter;
