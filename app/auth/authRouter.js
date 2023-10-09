const express = require("express");

const authRouter = express.Router();
const authRepo = require("./repo/authRepo");

const Email = require("../src/users/helpers/sendMail");
const usersAccess = require("../src/users/data_access/usersAccess");

authRouter.post("/login", async (req, res) => {
    try {
        const form_data = req.body;
        const result = await authRepo.login(form_data);
        res.status(202).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

authRouter.get("/me", async (req, res) => {
    if (req.headers.authorization) {
        const result = await authRepo.getCurrentUser(req);
        res.status(200).json(result);
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

authRouter.post("/generate_code/:email", async (req, res) => {
    const email = req.params.email;
    const user = usersAccess.getByParameter("email", email);
    if (!user.is_active) {
        const newEmail = new Email(
            "mynovipazar@gmail.com",
            email,
            "cvzieepupbngudbx"
        );
        newEmail.sendCode();
        res.json(newEmail.code);
    } else {
        res.json("User already active");
    }
});

authRouter.post("/hash/:username/:code/:hash", async (req, res) => {
    // try {
    const username = req.params.username;
    const hash = req.params.hash;
    const user = await usersAccess.getUserByUsername(username);
    if (user.code === hash) {
        user.is_active = true;
        user.code = "";
        try {
            res.json(await usersAccess.updateUser(user.username, user));
        } catch (error) {
            res.status(400).json({ error: "User already activated" });
        }
    } else {
        res.json("Invalid data");
    }
});

module.exports = authRouter;
