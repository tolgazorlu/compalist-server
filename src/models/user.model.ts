import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

/**
 * @desc USER MODEL
 */

export enum Role {
    Normal = "normal",
    Admin = "admin",
}

@modelOptions({
    schemaOptions: { timestamps: true },
})
export class User {
    public _id?: string;

    @prop({ required: false })
    public avatar?: string;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public surname!: string;

    @prop({ required: true, unique: true })
    public email!: string;

    @prop({ required: true, unique: true })
    public phone!: string;

    @prop({ required: true })
    public password!: string;

    @prop({
        type: String,
        enum: Role,
        default: Role.Normal,
    })
    public role?: Role;

    /* VERIFY EMAIL */

    @prop({ required: false, default: false })
    public email_verified!: boolean;

    @prop()
    public verification_token!: string;

    /* RESET PASSWORD */

    @prop()
    reset_password_token?: String;

    @prop()
    reset_password_expires?: Date;
}

export const UserModel = getModelForClass(User);
