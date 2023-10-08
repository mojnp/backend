const User = require("../schemas/user"); // Replace with the correct path
const usersService = require("../services/users_service"); // Replace with the correct path

function getAllUsers() {
    return usersService.getAllUsers();
}

function createUser(user) {
    return usersService.createUser(user);
}

function getUserByUsername(username) {
    return usersService.getUserByUsername(username);
}

function updateUser(user) {
    return usersService.updateUser(user);
}

function deleteUser(username) {
    return usersService.deleteUser(username);
}

module.exports = {
    getAllUsers,
    createUser,
    getUserByUsername,
    updateUser,
    deleteUser,
};