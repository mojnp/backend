// authMiddleware.js
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config"); // Adjust the path and import your secret key

const checkAccessToken = (req, res, next) => {
    // Extract the access token from the request headers or wherever it is stored
    const accessToken = req.headers.authorization;

    if (!accessToken) {
        return res.status(401).json({ message: "Access token is missing" });
    }

    // Verify the access token
    jwt.verify(accessToken, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid access token" });
        }

        // Assuming decoded contains user information, you can use it to check permissions
        const user = decoded;

        // Check user's permissions here and decide whether to allow access

        // If everything is fine, proceed to the next middleware or route handler
        next();
    });
};

module.exports = { checkAccessToken };
