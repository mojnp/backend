const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_EXPIRE_MINUTES = 30;
const ALGORITHM = "HS256";
const SECRET_KEY = process.env.JWT_SECRET_KEY;

function createAccessToken(data, expiresDelta = null) {
    const toEncode = { ...data };
    const expiresIn = expiresDelta || ACCESS_TOKEN_EXPIRE_MINUTES * 60; // Default to 30 minutes
    const token = jwt.sign(toEncode, SECRET_KEY, {
        algorithm: ALGORITHM,
        expiresIn,
    });
    return token;
}

function getUserNameFromCurrentToken(authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, SECRET_KEY, {
            algorithms: [ALGORITHM],
        });
        return payload.username;
    } catch (error) {
        console.error("Error decoding JWT:", error.message);
        return null;
    }
}

module.exports = { createAccessToken, getUserNameFromCurrentToken };
