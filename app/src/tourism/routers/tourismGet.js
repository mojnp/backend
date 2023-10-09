const express = require("express");
const router = express.Router();

const tourismRepo = require("../repository/tourismRepo");

// GET tourism items by category
router.get("/:category", async (req, res) => {
    const category = req.params.category;
    try {
        const tourismItems = await tourismRepo.getTourismItemsByCategory(
            req,
            category
        );
        res.status(200).json(tourismItems);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET tourism item by category and name
router.get("/:category/:item", async (req, res) => {
    const category = req.params.category;
    const item = req.params.item;
    try {
        const tourismItem = await tourismRepo.getTourismItemByCategoryAndName(
            category,
            item,
            req
        );
        res.status(200).json(tourismItem);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET tourism item images
router.get("/:category/:item/images", async (req, res) => {
    const category = req.params.category;
    const item = req.params.item;
    try {
        const images = await tourismRepo.getTourismItemImages(
            req,
            category,
            item
        );
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET tourism item image by image_id
router.get("/:category/:item/images/:image_id", async (req, res) => {
    const category = req.params.category;
    const item = req.params.item;
    const image_id = req.params.image_id;
    try {
        const image = await tourismRepo.getTourismItemImage(
            category,
            item,
            image_id
        );
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
