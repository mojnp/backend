function RoleChecker(allowedRoles) {
    return async function (user) {
        if (!user || !user.role || !allowedRoles.includes(user.role)) {
            return "Operation forbidden";
        }
        return 200;
    };
}

module.exports = RoleChecker;
