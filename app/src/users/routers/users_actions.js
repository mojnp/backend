const express = require("express");
const router = express.Router();
const { TourismItem } = require("../tourism/schemas/tourism"); // Import the TourismItem model or class from your tourism schema file
const userActionsRepo = require("../users/repository/user_actions_repo"); // Import your user_actions_repo or repository functions

// POST create user request
router.post("/request", async (req, res) => {
    const { username } = req.body; // Extract username from the request body
    const request = req.body.request; // Extract the request object from the request body

    try {
        // Implement the logic to create a user request here
        const result = await userActionsRepo.createUserRequest(
            username,
            request
        );
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
