const { Schema, model } = require("mongoose"); // Replace with the correct library and setup for your schema

const activitySchema = new Schema({
    id: Number,
    name: String,
    date: String,
});

const userSchema = new Schema({
    username: String,
    password: String,
    full_name: String,
    address: String,
    email: String,
    phone_number: String,
    role: String,
    status: String,
    avatar: String,
    premium: Boolean,
    is_active: Boolean,
    saved: [{ type: Object }],
    liked: [{ type: Object }],
    activity_log: [{ type: Object }],
    viewed: [{ type: Object }],
    shared: [{ type: Object }],
    contributed: [{ type: Object }],
    contribution_level: Number,
});

const ActivityModel = model("Activity", activitySchema);
const UserModel = model("User", userSchema);

module.exports = {
    ActivityModel,
    UserModel,
};
