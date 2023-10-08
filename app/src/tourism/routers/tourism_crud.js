const express = require("express");
const tourismCrudRouter = express.Router();

const RoleChecker = require("../../../auth/helpers/roleChecker");
const tourismRepo = require("../repo/tourism_repo");

const allowedRoles = new RoleChecker(["admin", "staff"]);

// GET all tourism items
tourismCrudRouter.get("", async (req, res) => {
    try {
        const result = await tourismRepo.getTourismItems(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Error fetching tourism items: " + error.message,
        });
    }
});

// POST create a new tourism item
tourismCrudRouter.post("", async (req, res) => {
    const body = req.body;
    try {
        const result = await tourismRepo.createTourismItem(body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Error creating tourism item: " + error.message,
        });
    }
});

// PUT update an existing tourism item
tourismCrudRouter.put("", allowedRoles, async (req, res) => {
    const name = req.body.name;
    const body = req.body;
    try {
        const updatedItem = await tourismRepo.updateTourismItem(name, body);
        res.status(202).json(updatedItem);
    } catch (error) {
        res.status(500).json({
            error: "Error updating tourism item: " + error.message,
        });
    }
});

// DELETE soft delete a tourism item
tourismCrudRouter.delete("", allowedRoles, async (req, res) => {
    const name = req.body.name;
    try {
        const result = await tourismRepo.softDeleteTourismItem(name);
        res.status(202).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Error soft deleting tourism item: " + error.message,
        });
    }
});

// DELETE hard delete a tourism item
tourismCrudRouter.delete("/hard", async (req, res) => {
    const name = req.body.name;
    try {
        const result = await tourismRepo.hardDeleteTourismItem(name);
        res.status(202).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Error hard deleting tourism item: " + error.message,
        });
    }
});

// PATCH create a new tourism item image
tourismCrudRouter.patch("/:category/:item/images", async (req, res) => {
    const category = req.params.category;
    const item = req.params.item;
    // Handle file upload here using Express middleware for file uploads
    // Example: multer middleware can be used to handle file uploads
    // You'll need to configure multer to handle file uploads to your desired storage
    try {
        // Handle image upload and return the result
        // You can use a different library or method to handle file uploads as per your needs
        const result = await tourismRepo.createTourismItemImage(
            category,
            item,
            req.file
        );
        res.status(202).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Error creating tourism item image: " + error.message,
        });
    }
});

module.exports = tourismCrudRouter;
