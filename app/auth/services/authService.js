const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../../src/users/services/usersService"); // Replace with your user service functions
const hashedPassword = require("../../src/users/helpers/hashPassword"); // Replace with your password hashing function

async function login(formData) {
    const username = formData.username;
    const password = formData.password;

    const user = await getUserByUsername(username);
    if (user && user.password === hashedPassword(password)) {
        const accessToken = generateAccessToken(username);
        return { access_token: accessToken, token_type: "bearer" };
    }
}

// Function to generate an access token
function generateAccessToken(username) {
    const tokenPayload = { username };
    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: "30m",
    });
    return accessToken;
}

// Function to authenticate and generate an access token
async function authenticateAndGenerateToken(username, password) {
    if (getUserByUsername(username)) {
        const user = getUserByUsername(username);
        if (
            user.username === username &&
            user.password === hashedPassword(password)
        ) {
            const accessToken = generateAccessToken(username);
            return { access_token: accessToken, token_type: "bearer" };
        }
        throw new Error("Invalid data");
    }
    throw new Error("Invalid username or password");
}

// Function to get the current user from a JWT token
async function getCurrentUser(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return getUserByUsername(decodedToken.username);
    } catch (error) {
        throw new Error("Not logged in");
    }
}

module.exports = {
    login,
    generateAccessToken,
    authenticateAndGenerateToken,
    getCurrentUser,
};
