const { getByName, update } = require("../data_access/tourismAccess");

const createTourismItemAction = (request, name, action) => {
    const item = getByName(name)[0];
    const actionData = action;

    if (actionData.rating !== undefined) {
        const firstDigit = parseInt(actionData.rating.toString()[0]);
        if (!isNaN(firstDigit)) {
            item.reviews.push(actionData);
        }
    } else if (actionData.type === "like") {
        item.likes += 1;
    } else if (actionData.type === "share") {
        item.shares += 1;
    } else if (actionData.type === "save") {
        item.saves += 1;
    }

    update(item);
};

module.exports = {
    createTourismItemAction,
};
