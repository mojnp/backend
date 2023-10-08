const {
    IsInt,
    IsString,
    IsBoolean,
    IsNumber,
    IsEmail,
    IsUrl,
    IsArray,
    ValidateNested,
} = require("class-validator");

class Action {
    @IsInt()
    id;

    @IsString()
    username;

    @IsString()
    type;

    @IsString()
    date;
}

class SocialMedia {
    @IsString()
    instagram;

    @IsString()
    facebook;

    @IsString()
    twitter;
}

class Contact {
    @IsString()
    phone;

    @IsEmail()
    email;

    @IsUrl()
    website;
}

class SpecialOptions {
    @IsBoolean()
    has_security;

    @IsBoolean()
    has_parking;

    @IsBoolean()
    has_restroom;
}

class TourismItemReview {
    @IsInt()
    id;

    @IsString()
    title;

    @IsString()
    description;

    @IsNumber()
    rating;

    @IsString()
    author;
}

class TourismItem {
    @IsInt()
    id;

    @IsBoolean()
    is_active;

    @IsObject() // Define the schema for `created_by` based on your needs
    created_by;

    @IsString()
    name;

    @IsString()
    description;

    @IsNumber()
    lat;

    @IsNumber()
    lng;

    @IsUrl()
    gmaps_link;

    @IsString()
    category;

    @IsArray()
    images;

    @ValidateNested({ each: true })
    reviews;

    @ValidateNested()
    social_media;

    @IsString()
    opening_hour;

    @IsString()
    closing_hour;

    @IsString()
    status;

    @ValidateNested()
    special_options;

    @ValidateNested()
    contact;

    @IsArray()
    related_tourism_items;
}
