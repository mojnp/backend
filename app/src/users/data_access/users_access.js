const { ObjectId } = require("mongodb");

const getAllUsers = async () => {
    try {
        const users = await db.collection("users").find({}).toArray();
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Internal Server Error");
    }
};

// Update a user by username
const updateUser = async (username, user) => {
    try {
        const existingUser = await db.collection("users").findOne({ username });
        const updatedUser = {
            ...existingUser,
            ...user,
        };
        await db
            .collection("users")
            .updateOne({ username }, { $set: updatedUser });
        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Internal Server Error");
    }
};

// Get user by username
const getUserByUsername = async (username) => {
    try {
        const user = await db.collection("users").findOne({ username });
        return user;
    } catch (error) {
        console.error("Error fetching user by username:", error);
        throw new Error("Internal Server Error");
    }
};

// Create a new user
const createUser = async (user) => {
    try {
        if (!(await db.collection("users").countDocuments({ id: user.id }))) {
            user._id = user.username;
            await db.collection("users").insertOne(user);
            return user;
        }
        return { message: "User already exists" };
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Internal Server Error");
    }
};

// Delete a user by username
const deleteUser = async (username) => {
    try {
        const deletedUser = await db
            .collection("users")
            .findOneAndDelete({ username });
        return deletedUser;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Internal Server Error");
    }
};
