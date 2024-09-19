import {
    modelOptions,
    prop,
    getModelForClass,
    Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import mongoose from "mongoose";

/**
 * @desc BLOG MODEL
 */

@modelOptions({
    schemaOptions: { timestamps: true },
})
export class Post {
    public _id?: string;

    @prop({
        ref: () => User,
        type: mongoose.Schema.Types.ObjectId,
    })
    public author?: Ref<User>;

    @prop({ required: true })
    title!: string;

    @prop({ required: false })
    image!: string;

    @prop({ required: true })
    content!: string;

    @prop({ required: true })
    slug!: string;

    @prop({ required: false })
    about!: string;

    @prop({ required: false })
    category?: string;

    @prop({ required: false })
    sub_categories?: string[];
}

export const PostModel = getModelForClass(Post);
