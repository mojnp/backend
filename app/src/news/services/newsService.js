const mongodb = require("mongodb");
const { connectToDb } = require("../../../database/db");
const { query } = require("express");

const db = connectToDb("news");

async function getAll() {
    try {
        const items = await db?.find().sort({ published: -1 }).toArray();
        return items;
    } catch (error) {
        console.error(error);
        throw new Error("Error: No news items found in the database");
    }
}

async function create(data) {
    data._id = data.linkId;
    try {
        await new db.insertOne(data);
        return data; // Return the newly created item
    } catch (error) {
        console.error(error);
        throw new Error("Error: Cannot create the news item");
    }
}

async function createMany(data) {
    for (const item of data) {
        item._id = item.linkId;
    }
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
            data,
            { new: true }
        );
        if (!updatedItem) {
            throw new Error("Error: News item not found");
        }
        return updatedItem.toObject();
    } catch (error) {
        console.error(error);
        throw new Error("Error: Cannot update the news item");
    }
}

async function getByKey(id) {
    let query = new mongodb.ObjectId("6522e8be2088f98c90f88264");

    try {
        return await db?.findOne({
            _id: query,
        });
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
