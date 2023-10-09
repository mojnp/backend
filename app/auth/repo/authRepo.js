const authService = require("../services/authService");

const getCurrentUser = async (request) => {
    return await authService.getCurrentUser(request.headers.authorization);
};

const login = async (formData) => {
    return authService.login(formData);
};

module.exports = {
    getCurrentUser,
    login,
};
