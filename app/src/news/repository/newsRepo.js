const {
    getAll,
    getByKey,
    update,
    deleteItem,
    clearData,
} = require("../services/newsService"); // Replace with the correct path

async function getAllArticles() {
    try {
        return await getAll();
    } catch (error) {
        console.error(error);
        throw new Error("Error getting all news");
    }
}

async function getById(id) {
    try {
        return await getByKey(id);
    } catch (error) {
        console.error(error);
        throw new Error("Error getting news by ID");
    }
}

async function create(data) {
    try {
        return await create(data);
    } catch (error) {
        console.error(error);
        throw new Error("Error creating news");
    }
}

async function createMany(data) {
    try {
        return await createMany(data);
    } catch (error) {
        console.error(error);
        throw new Error("Error creating multiple news");
    }
}

async function updateNews(data) {
    try {
        return await update(data);
    } catch (error) {
        console.error(error);
        throw new Error("Error updating news");
    }
}

async function deleteNews(key) {
    try {
        return await deleteItem(key);
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting news");
    }
}

async function clearAllData() {
    try {
        return await clearData();
    } catch (error) {
        console.error(error);
        throw new Error("Error clearing data");
    }
}

module.exports = {
    getAllArticles,
    getById,
    create,
    createMany,
    updateNews,
    deleteNews,
    clearAllData,
};
