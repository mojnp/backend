const express = require("express");
const tourismRouter = express.Router();
const tourismCrudRouter = require("./routers/tourismCrud");
const tourismGetRouter = require("./routers/tourismGet");
const tourismActionsRouter = require("./routers/tourismActions");

router.use("/tourism", tourismCrudRouter);
router.use("/tourism", tourismGetRouter);
router.use("/tourism", tourismActionsRouter);

module.exports = tourismRouter;
