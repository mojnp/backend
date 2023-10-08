const AWS = require("aws-sdk");
const { MongoClient } = require("mongodb"); // You may need to install the 'mongodb' package

const DB_NAME = process.env.MOJNP_DB;
const DO_BUCKET = process.env.DO_BUCKET;

const s3 = new AWS.S3({
    region: "fra1", // Replace with your desired region
    accessKeyId: process.env.DO_ACCESS_KEY,
    secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
    endpoint: new AWS.Endpoint("https://fra1.digitaloceanspaces.com"),
});

const connectToDrive = () => {
    return s3;
};

const connectToDb = async () => {
    const client = new MongoClient(DB_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();
    return client.db();
};

const db = connectToDb();

const getAll = async () => {
    return await db.collection("tourism").find({}).toArray();
};

const getByCategory = async (category) => {
    return await db
        .collection("tourism")
        .find({ category, is_active: true })
        .toArray();
};

const getByName = async (name) => {
    return await db.collection("tourism").find({ name }).toArray();
};

const create = async (data) => {
    await db.collection("tourism").insertOne(data);
    return data;
};

const update = async (name, data) => {
    await db.collection("tourism").updateOne({ name }, { $set: data });
    return data;
};

const deleteItem = async (name) => {
    return await db.collection("tourism").deleteOne({ name });
};

module.exports = {
    connectToDrive,
    getAll,
    getByCategory,
    getByName,
    create,
    update,
    delete: deleteItem,
};
