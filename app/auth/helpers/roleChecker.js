function roleChecker(allowedRoles) {
    return (req, res, next) => {
        const user = req.user; // Assuming user information is stored in the request object

        if (!user || !user.role || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ error: "Operation forbidden" });
        }

        next(); // Continue to the next middleware or route handler
    };
}

module.exports = {
    roleChecker,
};
