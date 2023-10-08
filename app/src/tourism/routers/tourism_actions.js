const express = require("express");
const tourismActionsRouter = express.Router();

const RoleChecker = require("../../../auth/helpers/roleChecker");
const tourismActionsRepo = require("../repo/tourism_actions_repo");
const { HTTPException, status } = require("http-exceptions"); // You may need to install the 'http-exceptions' package

const allowedRoles = new RoleChecker(["admin", "staff"]);
const userRole = new RoleChecker(["user", "admin", "staff"]);

// POST create a review for a tourism item
tourismActionsRouter.post("/review/:name", async (req, res) => {
    const name = req.params.name;
    const review = req.body;
    try {
        const result = await tourismActionsRepo.createTourismItemReview(
            req,
            name,
            review
        );
        res.status(status.CREATED).json(result);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            error: "Error creating review for tourism item: " + error.message,
        });
    }
});

// POST create a like for a tourism item
tourismActionsRouter.post("/like/:name", userRole, async (req, res) => {
    const name = req.params.name;
    const action = req.body;
    try {
        const result = await tourismActionsRepo.tourismItemLike(name, action);
        res.status(status.CREATED).json(result);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            error: "Error creating like for tourism item: " + error.message,
        });
    }
});

// POST create a share for a tourism item
tourismActionsRouter.post("/share/:name", userRole, async (req, res) => {
    const name = req.params.name;
    const action = req.body;
    try {
        const result = await tourismActionsRepo.tourismItemShare(name, action);
        res.status(status.CREATED).json(result);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            error: "Error creating share for tourism item: " + error.message,
        });
    }
});

// POST save a tourism item
tourismActionsRouter.post("/save/:name", userRole, async (req, res) => {
    const name = req.params.name;
    const action = req.body;
    try {
        const result = await tourismActionsRepo.tourismItemSave(name, action);
        res.status(status.CREATED).json(result);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            error: "Error saving tourism item: " + error.message,
        });
    }
});

module.exports = tourismActionsRouter;
