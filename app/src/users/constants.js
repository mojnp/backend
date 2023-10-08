const os = require("os");

const DEFAULT_ROLE = "user";
const DEFAULT_STATUS = false;
const DEFAULT_LISTS = [[], [], [], [], []];
const EMAIL_SENDER = "mynovipazar@gmail.com";
const EMAIL_PASSWORD = process.env.SMTP_PASSWORD;
const ACTIONS = ["like", "save", "share", "contribute", "view", "request"];

module.exports = {
    DEFAULT_ROLE,
    DEFAULT_STATUS,
    DEFAULT_LISTS,
    EMAIL_SENDER,
    EMAIL_PASSWORD,
    ACTIONS,
};
