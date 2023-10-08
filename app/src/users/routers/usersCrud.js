const express = require("express");
const {
    getAllUsers,
    createUser,
    getUserByUsername,
    updateUser,
    deleteUser,
} = require("../repository/usersRepo");

const usersCrudRouter = express.Router();

usersCrudRouter.get("/", (req, res) => {
    res.send(getAllUsers());
});

usersCrudRouter.get("/:username", (req, res) => {
    res.send(getUserByUsername(req.params.username));
});

usersCrudRouter.post("/", (req, res) => {
    res.send(createUser(req.body));
});

usersCrudRouter.put("/", (req, res) => {
    res.send(updateUser(req.body));
});

usersCrudRouter.delete("/", (req, res) => {
    res.send(deleteUser(req.body.username));
});

module.exports = usersCrudRouter;
