const { connectToDb } = require("../../database/db");

const db = connectToDb("users");

async function check_user_exists(username) {
    const user = await db.collection("users").findOne({ username });
    return !!user;
}

module.exports = {
    check_user_exists,
};
