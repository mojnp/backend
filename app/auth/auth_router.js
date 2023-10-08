const express = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { OAuth2PasswordRequestForm } = require("oauth2-server");
const { checkAccessToken } = require("./middleware/authMiddleware");

const router = express.Router();

// Import necessary functions and modules as needed
const { login } = require("./repo/auth_repo");
const {
    get_by_parameter,
    get_user_by_username,
    update_user,
} = require("../src/users/data_access/users_access");
const { hashed_password } = require("../src/users/helpers/hash_password");
const { Email } = require("../src/users/helpers/send_mail");

// OAuth2 scheme configuration
const oauth2Scheme = OAuth2PasswordRequestForm;

// Login route
router.post("/login", async (req, res) => {
    try {
        // Call the login function here and handle the response accordingly
        const token = await login(req.body);
        res.status(202).json({ access_token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get user's profile (protected)
router.get("/me", checkAccessToken, async (req, res) => {
    // Retrieve the user's profile based on the access token and send it as a response
    res.status(200).json(req.user);
});

// Route to generate and send a verification code via email
router.post("/generate_code/:email", async (req, res) => {
    const { email } = req.params;

    try {
        // Check if the user with the given email exists and is not active
        const user = get_by_parameter("email", email);
        if (!user.is_active) {
            const newEmail = new Email(
                "mynovipazar@gmail.com",
                email,
                "vzqjjrdgranmbivn"
            );
            newEmail.send_code();
            return res
                .status(200)
                .json({ code: hashed_password(newEmail.code) });
        }
        return res.status(400).json({ message: "User already active" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to hash the verification code and activate the user
router.post("/hash/:username/:code/:hash", async (req, res) => {
    const { username, code, hash } = req.params;

    try {
        // Compare the hashed code with the provided hash
        if (hashed_password(code) === hash) {
            // Get the user by username
            const user = get_user_by_username(username);
            if (user) {
                user.is_active = true;
                user.code = "";
                update_user(user.id, user);
                return res.status(200).json({ message: "User activated" });
            }
        }
        return res.status(400).json({ message: "Invalid data" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
