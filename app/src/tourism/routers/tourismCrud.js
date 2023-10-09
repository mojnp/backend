const express = require("express");
const router = express.Router();

const RoleChecker = require("./path/to/RoleChecker");
const tourismRepo = require("../repository/tourismRepo");

const allowedRoles = new RoleChecker(["admin", "staff"]);

// GET all tourism items
router.get("/", async (req, res) => {
    try {
        const request = req;
        const tourismItems = await tourismRepo.getTourismItems(request);
        res.status(200).json(tourismItems);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST create tourism item
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const newTourismItem = await tourismRepo.createTourismItem(body);
        res.status(201).json(newTourismItem);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT update tourism item
router.put("/:name", allowedRoles, async (req, res) => {
    const name = req.params.name;
    const body = req.body;
    try {
        const updatedItem = await tourismRepo.updateTourismItem(name, body);
        res.status(202).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE soft delete tourism item
router.delete("/:name", allowedRoles, async (req, res) => {
    const name = req.params.name;
    try {
        const deletedItem = await tourismRepo.softDeleteTourismItem(name);
        res.status(202).json(deletedItem);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE hard delete tourism item
router.delete("/hard/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const deletedItem = await tourismRepo.hardDeleteTourismItem(name);
        res.status(202).json(deletedItem);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PATCH create tourism item image
router.patch("/:category/:item/images", async (req, res) => {
    const category = req.params.category;
    const item = req.params.item;
    const imageFile = req.files.imageFile; // Assuming you have middleware for file uploads
    try {
        const newImage = await tourismRepo.createTourismItemImage(
            category,
            item,
            imageFile
        );
        res.status(202).json(newImage);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
