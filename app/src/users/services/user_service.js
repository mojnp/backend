const {
    DEFAULT_ROLE,
    DEFAULT_STATUS,
    EMAIL_PASSWORD,
    EMAIL_SENDER,
} = require("../constants");
const usersAccess = require("../data_access/users_access");
const { hashedPassword } = require("../helpers/hash_password");
const Email = require("../helpers/send_mail");
const User = require("../schemas/user");

function parseUser(user) {
    const parsedUser = {
        ...user,
        password: hashedPassword(user.password),
        is_active: DEFAULT_STATUS,
        premium: DEFAULT_STATUS,
        role: DEFAULT_ROLE,
        id: user.username,
        liked: [],
        activity_log: [],
        contributed: [],
        shared: [],
        saved: [],
    };

    const email = new Email(EMAIL_SENDER, user.email, EMAIL_PASSWORD);
    email.sendCode();

    parsedUser.code = hashedPassword(email.code);

    return parsedUser;
}

async function getAllUsers() {
    return await usersAccess.getAllUsers();
}

async function createUser(user) {
    const parsedUser = parseUser(user);
    await usersAccess.createUser(parsedUser);
    return parsedUser;
}

async function getUserByUsername(username) {
    return await usersAccess.getUserByUsername(username);
}

async function updateUser(user) {
    user.password = hashedPassword(user.password);
    await usersAccess.updateUser(user.username, user);
    return user;
}

async function deleteUser(username) {
    return await usersAccess.deleteUser(username);
}

module.exports = {
    getAllUsers,
    createUser,
    getUserByUsername,
    updateUser,
    deleteUser,
};
