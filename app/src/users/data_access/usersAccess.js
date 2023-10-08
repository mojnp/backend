const { connectToDb } = require("../../../database/db");

const db = connectToDb("users");

async function getAllUsers() {
    try {
        const users = await db.collection("users").find({}).toArray();
        if (users.length === 0) {
            return [];
        }
        return users;
    } catch (error) {
        return [];
    }
}

async function updateUser(username, user) {
    try {
        const existingUser = await db.collection("users").findOne({ username });
        if (!existingUser) {
            return [];
        }

        const updatedUser = {
            ...existingUser,
            ...Object.fromEntries(
                Object.entries(user).filter(([_, v]) => v !== null)
            ),
        };

        try {
            await db
                .collection("users")
                .updateOne({ username }, { $set: updatedUser });
        } catch (error) {
            return [];
        }

        return updatedUser;
    } catch (error) {
        return [];
    }
}

async function getUserByUsername(username) {
    try {
        const user = await db.collection("users").findOne({ username });
        if (!user) {
            return [];
        }
        return user;
    } catch (error) {
        return [];
    }
}

async function getByParameter(parameter, value) {
    try {
        const user = await db
            .collection("users")
            .findOne({ [parameter]: value });
        if (!user) {
            return [];
        }
        return user;
    } catch (error) {
        return [];
    }
}

async function createUser(user) {
    try {
        const existingUser = await db
            .collection("users")
            .countDocuments({ id: user.id });
        if (existingUser === 0) {
            user._id = user.username;
            try {
                await db.collection("users").insertOne(user);
                return user;
            } catch (error) {
                return [];
            }
        }
        return { message: "User already exists" };
    } catch (error) {
        return [];
    }
}

async function deleteUser(username) {
    try {
        const deletedUser = await db
            .collection("users")
            .findOneAndDelete({ username });
        if (!deletedUser.value) {
            return [];
        }
        return deletedUser.value;
    } catch (error) {
        return [];
    }
}

module.exports = {
    connectToDb,
    getAllUsers,
    updateUser,
    getUserByUsername,
    getByParameter,
    createUser,
    deleteUser,
};
