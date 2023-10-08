const userActionsService = require("../services/users_actions_service"); // Import your users_actions_service functions

// Create user action
function createUserAction(req, res) {
    const { username, action_name } = req.params;
    const actionData = req.body; // Assuming the action data is sent in the request body

    try {
        const result = userActionsService.createUserAction(
            username,
            action_name,
            actionData
        );
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// Create user request
function createUserRequest(req, res) {
    const { username } = req.params;
    const requestData = req.body; // Assuming the request data is sent in the request body

    try {
        const result = userActionsService.createUserRequest(
            username,
            requestData
        );
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    createUserAction,
    createUserRequest,
};
