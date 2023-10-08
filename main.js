require("dotenv").config();
const express = require("express");

const usersRouter = require("./app/src/users/users");
const newsRouterMain = require("./app/src/news/news");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/news", newsRouterMain);
app.use("/users", usersRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
