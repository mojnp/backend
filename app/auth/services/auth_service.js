const { OAuth2PasswordRequestForm } = require("oauth2-server");
const {
    createAccessToken,
    getUsernameFromCurrentUser,
} = require("../auth/helpers/auth_handler");
const { hashedPassword } = require("../app-src-users-helpers-hash_password");
const { checkUserExists } = require("../auth/data_access/auth_access");
const {
    get_user_by_username,
} = require("../app-src-users-services-users_service");

const oauth2Scheme = OAuth2PasswordRequestForm;

function parseToken(credentials) {
    const access_token_expires = 30 * 60; // 30 minutes
    const access_token = createAccessToken(
        { username: credentials.username },
        access_token_expires
    );
    return { access_token, token_type: "bearer" };
}

async function getCurrentUser(request) {
    const username = getUsernameFromCurrentUser(request);
    if (username) {
        const user = await get_user_by_username(username);
        if (user) {
            return user;
        }
    }
    return "Not logged in";
}

async function login(form_data) {
    if (await checkUserExists(form_data.username)) {
        const user = await get_user_by_username(form_data.username);
        if (
            user.username === form_data.username &&
            user.password === hashedPassword(form_data.password)
        ) {
            return parseToken(form_data);
        }
        return "Invalid data";
    }
    return "Invalid username or password";
}

module.exports = {
    oauth2Scheme,
    getCurrentUser,
    login,
};
