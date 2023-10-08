const { TOURISM_CATEGORIES } = require("../constants"); // Import your constants

const tourismService = require("../services/tourism_service");

function validateData(data) {
    let passed = 0;
    if (TOURISM_CATEGORIES.includes(data.category)) {
        passed += 1;
    }
    if (data.lat && data.lng) {
        passed += 1;
    }

    return passed === 2;
}

function parseData(data) {
    data.reviews = [];
    data.images = [];
    data.related_tourism_items = [];
    return data;
}

function getTourismItems(request) {
    return tourismService.getTourismItems(request);
}

function getTourismItemById(request, id) {
    return tourismService.getTourismItemById(request, id);
}

function createTourismItem(data) {
    if (validateData(data)) {
        data = parseData(data);
        return tourismService.createTourismItem(data);
    }
    throw new Error("Invalid data provided");
}

function updateTourismItem(name, request) {
    if (validateData(request)) {
        const data = parseData(request);
        return tourismService.updateTourismItem(name, data);
    }
    throw new Error("Invalid data provided");
}

function softDeleteTourismItem(name) {
    return tourismService.softDeleteTourismItem(name);
}

function hardDeleteTourismItem(name) {
    return tourismService.hardDeleteTourismItem(name);
}

function getTourismItemImages(request, category, item) {
    return tourismService.getTourismItemImages(request, category, item);
}

function getTourismItemImage(category, item, imageId) {
    return tourismService.getTourismItemImage(category, item, imageId);
}

function getTourismItemsByCategory(request, category) {
    return tourismService.getTourismItemsByCategory(request, category);
}

function getTourismItemByCategoryAndName(category, itemName, request) {
    return tourismService.getTourismItemByCategoryAndName(
        category,
        itemName,
        request
    );
}

function createTourismItemImage(category, itemName, image) {
    return tourismService.createTourismItemImage(category, itemName, image);
}

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
