const jwt = require("jsonwebtoken");
const os = require("os");

const ACCESS_TOKEN_EXPIRE_MINUTES = 30;
const ALGORITHM = "HS256";
const SECRET_KEY = process.env.JWT_SECRET_KEY;

function create_access_token(data, expires_delta = null) {
    const to_encode = { ...data };
    if (expires_delta) {
        const expire = new Date() + expires_delta;
        to_encode.exp = expire;
    } else {
        const expire = new Date() + 15 * 60 * 1000; // 15 minutes
        to_encode.exp = expire;
    }
    const encoded_jwt = jwt.sign(to_encode, SECRET_KEY, {
        algorithm: ALGORITHM,
    });

    return encoded_jwt;
}

function get_username_from_current_user(request) {
    const token = request.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, SECRET_KEY, { algorithms: [ALGORITHM] });
    return payload.username;
}

module.exports = { create_access_token, get_username_from_current_user };
