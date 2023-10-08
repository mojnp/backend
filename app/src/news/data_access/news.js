const { connectToDb } = require("../../../database/db");

const db = connectToDb("news");

async function getAll() {
    try {
        const items = await db.find().sort({ published: -1 }).toArray();
        return items;
    } catch (error) {
        console.error(error);
        throw new Error("Error: No news items found in the database");
    }
}

async function create(data) {
    data._id = data.linkId;
    try {
        await db.insertOne(data);
        return data; // Return the newly created item
    } catch (error) {
        console.error(error);
        throw new Error("Error: Cannot create the news item");
    }
}

async function createMany(data) {
    try {
        await db.insertMany(data);
    } catch (error) {
        console.error(error);
        throw new Error("Error: Cannot create the news items");
    }
}

async function update(data) {
    try {
        const updatedItem = await db.findOneAndUpdate(
            { _id: data.linkId },
            { $set: data },
            { returnOriginal: false }
        );
        if (!updatedItem.value) {
            throw new Error("Error: News item not found");
        }
        return updatedItem.value;
    } catch (error) {
        console.error(error);
        throw new Error("Error: Cannot update the news item");
    }
}

async function getByKey(id) {
    try {
        const item = await db.findOne({ _id: id });
        if (!item) {
            throw new Error("Error: News item not found");
        }
        return item;
    } catch (error) {
        console.error(error);
        throw new Error("Error: Cannot get the news item");
    }
}

async function deleteItem(key) {
    try {
        const result = await db.deleteOne({ _id: key });
        if (result.deletedCount === 0) {
            throw new Error("Error: News item not found");
        }
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error: Cannot delete the news item");
    }
}

async function clearData() {
    try {
        await db.deleteMany({});
    } catch (error) {
        console.error(error);
        throw new Error("Error: Cannot clear the news data");
    }
}

module.exports = {
    getAll,
    create,
    createMany,
    update,
    getByKey,
    deleteItem,
    clearData,
};
