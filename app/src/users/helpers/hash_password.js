const crypto = require("crypto");

function hashed_password(password) {
    const hash = crypto.createHash("sha512");
    hash.update(password, "utf-8");
    return hash.digest("hex");
}

module.exports = hashed_password;
