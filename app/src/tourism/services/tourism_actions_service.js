const tourismAccess = require("../data_access/tourism_access");

async function createTourismItemAction(request, name, action) {
    const item = (await tourismAccess.getByName(name))[0];

    if (action.rating && /^\d+$/.test(action.rating.toString())) {
        item.reviews.push(action);
    } else if (action.type === "like") {
        item.likes += 1;
    } else if (action.type === "share") {
        item.shares += 1;
    } else if (action.type === "save") {
        item.saves += 1;
    }

    await tourismAccess.update(item.name, item);
}

module.exports = {
    createTourismItemAction,
};
