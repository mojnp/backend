const usersService = require("../services/users_service"); // Import your users_service functions

// Get all users
function getAllUsers(req, res) {
    try {
        const users = usersService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// Create user
function createUser(req, res) {
    const user = req.body; // Assuming the user data is sent in the request body
    try {
        const newUser = usersService.createUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// Get user by username
function getUserByUsername(req, res) {
    const { username } = req.params;
    try {
        const user = usersService.getUserByUsername(username);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// Update user
function updateUser(req, res) {
    const user = req.body; // Assuming the user data is sent in the request body
    try {
        const updatedUser = usersService.updateUser(user);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// Delete user
function deleteUser(req, res) {
    const { username } = req.params;
    try {
        const deletedUser = usersService.deleteUser(username);
        if (deletedUser) {
            res.status(200).json(deletedUser);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserByUsername,
    updateUser,
    deleteUser,
};
