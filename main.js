require("dotenv").config();
const express = require("express");
const multer = require("multer");

const authRouter = require("./app/auth/authRouter");

const usersRouter = require("./app/src/users/users");
const newsRouter = require("./app/src/news/news");
const searchRouter = require("./app/src/search/search");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
const PORT = 8080;

app.use(upload.any());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/news", newsRouter);
app.use("/users", usersRouter);
app.use("/search", searchRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
