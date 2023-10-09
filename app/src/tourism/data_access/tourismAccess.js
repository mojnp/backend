const { connectToDb } = require("../../../database/db");

const db = connectToDb("tourism");

async function getAll() {
    return db.find({}).toArray();
}

async function getByCategory(request, category) {
    const items = await db.find({ category, is_active: true }).toArray();
    return items;
}

async function getByName(name) {
    return db.find({ name }).toArray();
}

async function create(data) {
    data._id = data.name;
    await db.insertOne(data);
    return data;
}

async function update(name, data) {
    await db.findOneAndUpdate({ name }, { $set: data });
    return data;
}

async function remove(name) {
    return db.deleteOne({ _id: name });
}

module.exports = {
    getAll,
    getByCategory,
    getByName,
    create,
    update,
    remove,
};
