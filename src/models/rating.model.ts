import {
    modelOptions,
    prop,
    getModelForClass,
    Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import mongoose from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Rating {
    public _id?: string;

    @prop({
        ref: () => User,
        type: mongoose.Schema.Types.ObjectId,
    })
    public owner?: Ref<User>;

    @prop({ required: false })
    public company_name!: string;

    @prop({ required: false })
    public project_name!: string;

    @prop({ required: false })
    public project_cost!: string;

    @prop({
        required: true,
    })
    public project_status!: string;

    @prop({ required: false })
    public project_desc!: string;

    @prop({ required: false })
    public which_service!: string;

    @prop({ required: false })
    public rating_title!: string;

    @prop({ required: false })
    public rating_detail!: string;

    @prop({ required: false })
    public service_quality!: string;

    @prop({ required: false })
    public time_management!: string;

    @prop({ required: false })
    public company_communication!: string;

    @prop({ required: false })
    public general_rating!: string;

    @prop({ required: false })
    public name!: string;

    @prop({ required: false })
    public email!: string;

    @prop({ required: false })
    public your_company_name!: string;

    @prop({ required: false })
    public company_position!: string;

    @prop({ required: false })
    public company_location!: string;

    @prop()
    public website!: string;

    @prop()
    public linkedin!: string;
}

export const RatingModel = getModelForClass(Rating);
