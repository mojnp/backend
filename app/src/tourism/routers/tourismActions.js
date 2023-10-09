const express = require("express");
const router = express.Router();

const RoleChecker = require("./path/to/RoleChecker");
const tourismActionsRepo = require("../repository/tourismActionsRepo");

const userRole = new RoleChecker(["user", "admin", "staff"]);

// Define routes
router.post("/review/:name", async (req, res) => {
    const name = req.params.name;
    const review = req.body;
    try {
        const result = await tourismActionsRepo.createTourismItemReview(
            req,
            name,
            review
        );
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/like/:name", userRole, async (req, res) => {
    const name = req.params.name;
    const action = req.body;
    try {
        const result = await tourismActionsRepo.tourismItemLike(name, action);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/share/:name", userRole, async (req, res) => {
    const name = req.params.name;
    const action = req.body;
    try {
        const result = await tourismActionsRepo.tourismItemShare(name, action);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/save/:name", userRole, async (req, res) => {
    const name = req.params.name;
    const action = req.body;
    try {
        const result = await tourismActionsRepo.tourismItemSave(name, action);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
