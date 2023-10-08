const express = require("express");
const tourismGetRouter = express.Router();

const RoleChecker = require("../../../auth/helpers/roleChecker");
const tourismRepo = require("../repo/tourism_repo");
const { HTTPException, status } = require("http-exceptions"); // You may need to install the 'http-exceptions' package

const allowedRoles = new RoleChecker(["admin", "staff"]);
const userRole = new RoleChecker(["user", "admin", "staff"]);

// Define your routes
tourismGetRouter.get("/:category", async (req, res) => {
    const category = req.params.category;
    try {
        const result = await tourismRepo.getTourismItemsByCategory(
            req,
            category
        );
        res.status(status.OK).json(result);
    } catch (error) {
        throw new HTTPException(
            status.INTERNAL_SERVER_ERROR,
            "Error fetching tourism items: " + error.message
        );
    }
});

tourismGetRouter.get("/:category/:item", async (req, res) => {
    const category = req.params.category;
    const item = req.params.item;
    try {
        const result = await tourismRepo.getTourismItemByCategoryAndName(
            category,
            item,
            req
        );
        res.status(status.OK).json(result);
    } catch (error) {
        throw new HTTPException(
            status.INTERNAL_SERVER_ERROR,
            "Error fetching tourism item: " + error.message
        );
    }
});

tourismGetRouter.get("/:category/:item/images", async (req, res) => {
    const category = req.params.category;
    const item = req.params.item;
    try {
        const result = await tourismRepo.getTourismItemImages(
            req,
            category,
            item
        );
        res.status(status.OK).json(result);
    } catch (error) {
        throw new HTTPException(
            status.INTERNAL_SERVER_ERROR,
            "Error fetching tourism item images: " + error.message
        );
    }
});

tourismGetRouter.get("/:category/:item/images/:image_id", async (req, res) => {
    const category = req.params.category;
    const item = req.params.item;
    const imageId = req.params.image_id;
    try {
        const result = await tourismRepo.getTourismItemImage(
            category,
            item,
            imageId
        );
        // Assuming 'tourism_repo.getTourismItemImage' returns the image data.
        res.status(status.OK).send(result);
    } catch (error) {
        throw new HTTPException(
            status.INTERNAL_SERVER_ERROR,
            "Error fetching tourism item image: " + error.message
        );
    }
});

module.exports = tourismGetRouter;
