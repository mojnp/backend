const { validationResult } = require("express-validator");
const tourismService = require("../services/tourismService");

const validateData = (data) => {
    const errors = validationResult(data);
    if (!errors.isEmpty()) {
        throw new Error("Invalid data provided");
    }
};

const parseData = (data) => {
    data.reviews = [];
    data.images = [];
    data.related_tourism_items = [];
    return data;
};

const getTourismItems = async (request) => {
    return tourismService.getTourismItems(request);
};

const createTourismItem = async (data) => {
    validateData(data);
    data = parseData(data);
    return tourismService.createTourismItem(data);
};

const updateTourismItem = async (name, request) => {
    validateData(request);
    const data = parseData(request);
    return tourismService.updateTourismItem(name, data);
};

const softDeleteTourismItem = async (name) => {
    return tourismService.softDeleteTourismItem(name);
};

const hardDeleteTourismItem = async (name) => {
    return tourismService.hardDeleteTourismItem(name);
};

const getTourismItemImages = async (request, category, item) => {
    return tourismService.getTourismItemImages(request, category, item);
};

const getTourismItemImage = async (category, item, imageId) => {
    return tourismService.getTourismItemImage(category, item, imageId);
};

const getTourismItemsByCategory = async (request, category) => {
    return tourismService.getTourismItemsByCategory(request, category);
};

const getTourismItemByCategoryAndName = async (category, itemName, request) => {
    return tourismService.getTourismItemByCategoryAndName(
        category,
        itemName,
        request
    );
};

const createTourismItemImage = async (category, itemName, image) => {
    return tourismService.createTourismItemImage(category, itemName, image);
};

module.exports = {
    getTourismItems,
    getTourismItemById,
    createTourismItem,
    updateTourismItem,
    softDeleteTourismItem,
    hardDeleteTourismItem,
    getTourismItemImages,
    getTourismItemImage,
    getTourismItemsByCategory,
    getTourismItemByCategoryAndName,
    createTourismItemImage,
};
