const tourismActionsService = require("../services/tourismActionsService");

const createTourismItemAction = async (request, name, action) => {
    return tourismActionsService.createTourismItemAction(request, name, action);
};

const createTourismItemImage = async (name, image) => {
    return tourismActionsService.createTourismItemImage(name, image);
};

const tourismItemLike = async (name, action) => {
    return tourismActionsService.createTourismItemAction(name, action);
};

const tourismItemShare = async (name, action) => {
    return tourismActionsService.createTourismItemAction(name, action);
};

const tourismItemSave = async (name, action) => {
    return tourismActionsService.createTourismItemAction(name, action);
};

const createTourismItemReview = async (request, name, review) => {
    return tourismActionsService.createTourismItemAction(request, name, review);
};

module.exports = {
    createTourismItemAction,
    createTourismItemImage,
    tourismItemLike,
    tourismItemShare,
    tourismItemSave,
    createTourismItemReview,
};
