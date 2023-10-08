const { MongoClient } = require("mongodb");
async function connectToDb() {
    const uri = process.env.MOJNP_MONGO_URI; // Replace with your MongoDB URI
    const client = new MongoClient(uri);

    let db;

    try {
        await client.connect();
        db = client.db("users");
    } catch (error) {
        return error;
    }
    return db;
}

module.exports = {
    connectToDb,
};
