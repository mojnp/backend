const { MongoClient } = require("mongodb");
const os = require("os");

const databaseName = process.env.MOJNP_DB;
const mongoURI = process.env.MOJNP_MONGO_URI;

async function check_user_exists(username) {
    try {
        const client = new MongoClient(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();

        const db = client.db(databaseName);
        const userCount = await db
            .collection("users")
            .countDocuments({ username });

        client.close();

        return userCount > 0;
    } catch (error) {
        console.error("Error checking if user exists:", error);
        throw error;
    }
}

module.exports = { check_user_exists };
