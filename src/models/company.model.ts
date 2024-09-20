import {
    modelOptions,
    prop,
    getModelForClass,
    Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import mongoose from "mongoose";
import { Rating } from "./rating.model";

/**
 * @desc COMPANY MODEL
 */

@modelOptions({
    schemaOptions: { timestamps: true },
})
export class Company {
    public _id?: string;

    @prop({
        ref: () => User,
        type: mongoose.Schema.Types.ObjectId,
    })
    public owner?: Ref<User>;

    @prop({ required: true })
    public company_name?: string;

    @prop({
        required: false,
        default: "https://imageupload.io/ib/3oXStgvAko9IBAp_1693943124.png",
    })
    public logo!: string;

    @prop({ required: false, unique: true })
    public slug!: string;

    @prop({ required: false })
    public slogan!: string;

    @prop({ required: false, default: "-" })
    public hourly_price?: string;

    @prop({ required: false })
    public founded_year!: string;

    @prop({ required: false })
    public numbers_of_employee!: number;

    @prop({ required: false })
    public numbers_of_customers?: number;

    @prop({ required: false })
    public website_link?: string;

    @prop({ required: false })
    public category?: string;

    @prop({ required: false })
    public sub_categories?: string[];

    @prop({ required: false })
    public city?: string;

    @prop({ required: false })
    public company_describe?: string;

    @prop({ required: false, default: 0 })
    public visits?: number;

    @prop({ required: false, default: 0 })
    public website_visits?: number;

    @prop()
    public social_instagram_link?: string;

    @prop()
    public social_linkedin_link?: string;

    @prop()
    public social_twitter_link?: string;

    @prop()
    public social_facebook_link?: string;

    @prop()
    public social_youtube_link?: string;

    @prop()
    public big_partners?: number;

    @prop({
        ref: () => Rating,
        type: [mongoose.Schema.Types.ObjectId],
    })
    public ratings?: Ref<Rating>[];

    @prop({ required: true, default: false })
    public isVerified?: boolean;

    @prop({ required: true, default: false })
    public isListed?: boolean;
}

export const CompanyModel = getModelForClass(Company);
