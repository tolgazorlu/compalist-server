import { Ref } from "@typegoose/typegoose";
import { Rating } from "./rating";
import { User } from "../models/user.model";

export type Company = {
    _id: string;
    company_name: string;
    logo: string;
    email?: string; // This field is not in your Mongoose schema but added here based on typical company info
    password?: string; // This field is not in your Mongoose schema but added here based on typical company info
    phone?: string; // This field is not in your Mongoose schema but added here based on typical company info
    sector?: string; // This field is not in your Mongoose schema but added here based on typical company info
    category: string;
    city?: string;
    company_describe?: string;
    slogan?: string;
    founded_year?: Date;
    number_of_employee?: number;
    email_verified?: boolean; // This field is not in your Mongoose schema but added here based on typical company info
    verification_token?: string; // This field is not in your Mongoose schema but added here based on typical company info
    sub_categories?: string[];
    isListed: boolean;
    hourly_price?: string;
    ratings: Ref<Rating>[] | string;
    owner?: string;
    social_instagram_link?: string;
    social_linkedin_link?: string;
    social_twitter_link?: string;
    social_facebook_link?: string;
    social_youtube_link?: string;
    big_partners?: number;
};
