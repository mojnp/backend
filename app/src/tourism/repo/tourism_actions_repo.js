const tourismActionsService = require("../services/tourism_actions_service");

function createTourismItemAction(request, name, action) {
    return tourismActionsService.createTourismItemAction(request, name, action);
}

function createTourismItemImage(name, image) {
    return tourismActionsService.createTourismItemImage(name, image);
}

function tourismItemLike(name, action) {
    return tourismActionsService.createTourismItemAction(name, action);
}

function tourismItemShare(name, action) {
    return tourismActionsService.createTourismItemAction(name, action);
}

function tourismItemSave(name, action) {
    return tourismActionsService.createTourismItemAction(name, action);
}

function createTourismItemReview(request, name, review) {
    return tourismActionsService.createTourismItemAction(request, name, review);
}

module.exports = {
    createTourismItemAction,
    createTourismItemImage,
    tourismItemLike,
    tourismItemShare,
    tourismItemSave,
    createTourismItemReview,
};
