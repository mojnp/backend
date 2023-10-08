const { OAuth2PasswordRequestForm } = require("oauth2-server");
const {
    oauth2Scheme,
    login,
    getCurrentUser,
} = require("../../src/users/services/user_service");

async function getCurrentUserHandler(request) {
    return getCurrentUser(request);
}

async function loginHandler(form_data) {
    return login(form_data);
}

module.exports = {
    get_current_user: getCurrentUserHandler,
    login: loginHandler,
};
