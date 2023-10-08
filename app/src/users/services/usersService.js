const {
    DEFAULT_ROLE,
    DEFAULT_STATUS,
    EMAIL_PASSWORD,
    EMAIL_SENDER,
} = require("../constants"); // Replace with the correct path

const usersAccess = require("../data_access/usersAccess"); // Replace with the correct path
const { hashedPassword } = require("../helpers/hashPassword"); // Replace with the correct path
const Email = require("../helpers/sendMail"); // Replace with the correct path
const UserModel = require("../schemas/user"); // Replace with the correct path

function _parseUser(user) {
    user.password = hashedPassword(user.password);
    user.is_active = DEFAULT_STATUS;
    user.premium = DEFAULT_STATUS;
    user.role = DEFAULT_ROLE;
    user.id = user.username;
    user.liked = [];
    user.activity_log = [];
    user.contributed = [];
    user.shared = [];
    user.saved = [];

    const email = new Email(EMAIL_SENDER, user.email, EMAIL_PASSWORD);
    email.sendCode();

    user.code = hashedPassword(email.code);

    return user;
}

function getAllUsers() {
    return usersAccess.getAllUsers();
}

function createUser(user) {
    user = _parseUser(user);
    usersAccess.createUser(user);
    return user;
}

function getUserByUsername(username) {
    return usersAccess.getUserByUsername(username);
}

function updateUser(user) {
    user.password = hashedPassword(user.password);
    usersAccess.updateUser(user.username, user);
    return user;
}

function deleteUser(username) {
    return usersAccess.deleteUser(username);
}

module.exports = {
    getAllUsers,
    createUser,
    getUserByUsername,
    updateUser,
    deleteUser,
};
