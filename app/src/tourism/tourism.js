const express = require("express");

const tourismRouter = express.Router();

// Include your router modules here (assuming you have already defined them)
const tourismCrudRouter = require("./routers/tourism_crud");
const tourismGetRouter = require("./routers/tourism_get");
const tourismActionsRouter = require("./routers/tourism_actions");

// Use your router modules
tourismRouter.use("/crud", tourismCrudRouter);
tourismRouter.use("/get", tourismGetRouter);
tourismRouter.use("/actions", tourismActionsRouter);

module.exports = tourismRouter;
