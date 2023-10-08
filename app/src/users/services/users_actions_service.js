const { createTourismItem } = require("../tourism_logic/tourism_logic");
const { ACTIONS } = require("../constants");
const { getUserByUsername, updateUser } = require("./users_service");

async function makeAnAction(username, actionName, actionData) {
    const user = await getUserByUsername(username);
    if (ACTIONS.includes(actionName)) {
        if (actionName === "request") {
            actionData.is_active = false;
            actionData.created_by = {
                type: "user",
                id: user.id,
                username: user.username,
            };
            createTourismItem(actionData);
            return user;
        }

        user[actionName + "d"].push(actionData);
        user.activity_log.push(actionData);
        await updateUser(user);
        return user;
    }
    return "Action not allowed";
}

module.exports = {
    makeAnAction,
};
