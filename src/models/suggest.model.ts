import {
    modelOptions,
    prop,
    getModelForClass,
    Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import mongoose from "mongoose";

/**
 * @desc SUGGEST MODEL
 */

export enum Status {
    Rejected = "rejected",
    Pending = "pending",
    Done = "done",
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Suggest {
    public _id?: string;

    @prop({
        ref: () => User,
        type: mongoose.Schema.Types.ObjectId,
    })
    public owner?: Ref<User>;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public surname!: string;

    @prop({ required: true })
    public company_name!: string;

    @prop({ required: true })
    public email!: string;

    @prop({ required: true })
    public phone!: string;

    @prop({ required: false })
    public service_selection!: string;

    @prop({ required: true })
    public project_detail!: string;

    @prop({
        type: String,
        enum: Status,
        default: Status.Pending,
    })
    public status!: Status;
}

export const SuggestModel = getModelForClass(Suggest);
