class Action {
    constructor(id, username, type, date) {
        this.id = id;
        this.username = username;
        this.type = type;
        this.date = date;
    }
}

class SocialMedia {
    constructor(instagram, facebook, twitter) {
        this.instagram = instagram;
        this.facebook = facebook;
        this.twitter = twitter;
    }
}

class Contact {
    constructor(phone, email, website) {
        this.phone = phone;
        this.email = email;
        this.website = website;
    }
}

class SpecialOptions {
    constructor(has_security, has_parking, has_restroom) {
        this.has_security = has_security;
        this.has_parking = has_parking;
        this.has_restroom = has_restroom;
    }
}

class TourismItemReview {
    constructor(id, title, description, rating, author) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.author = author;
    }
}

class TourismItem {
    constructor(
        id,
        is_active,
        created_by,
        name,
        description,
        lat,
        lng,
        gmaps_link,
        category,
        images,
        reviews,
        social_media,
        opening_hour,
        closing_hour,
        status,
        special_options,
        contact,
        related_tourism_items
    ) {
        this.id = id;
        this.is_active = is_active;
        this.created_by = created_by;
        this.name = name;
        this.description = description;
        this.lat = lat;
        this.lng = lng;
        this.gmaps_link = gmaps_link;
        this.category = category;
        this.images = images;
        this.reviews = reviews;
        this.social_media = social_media;
        this.opening_hour = opening_hour;
        this.closing_hour = closing_hour;
        this.status = status;
        this.special_options = special_options;
        this.contact = contact;
        this.related_tourism_items = related_tourism_items;
    }
}

module.exports = {
    Action,
    SocialMedia,
    Contact,
    SpecialOptions,
    TourismItemReview,
    TourismItem,
};
