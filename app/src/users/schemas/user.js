class Activity {
    constructor(id, name, date) {
        this.id = id;
        this.name = name;
        this.date = date;
    }
}

class User {
    constructor(
        username,
        password,
        full_name,
        address,
        email,
        phone_number,
        role,
        status,
        avatar,
        premium,
        is_active,
        saved,
        liked,
        activity_log,
        viewed,
        shared,
        contributed,
        contribution_level
    ) {
        this.username = username;
        this.password = password;
        this.full_name = full_name;
        this.address = address;
        this.email = email;
        this.phone_number = phone_number;
        this.role = role;
        this.status = status;
        this.avatar = avatar;
        this.premium = premium;
        this.is_active = is_active;
        this.saved = saved;
        this.liked = liked;
        this.activity_log = activity_log;
        this.viewed = viewed;
        this.shared = shared;
        this.contributed = contributed;
        this.contribution_level = contribution_level;
    }
}

module.exports = {
    Activity,
    User,
};
