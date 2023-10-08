require("dotenv").config();
const express = require("express");
const usersRouter = require("./app/src/users/users");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/users", usersRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
