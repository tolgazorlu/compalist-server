import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import { generateUserToken } from "../../utils/user.token";
import bcrypt from "bcrypt";
const { randomString } = require("../../utils/randomString");
const { verifyEmail } = require("../../services/email/verification");
const { sendErrorResponse } = require("../../utils/errorUtils");

/**
 * @desc Signup
 * @route api/auth/user/signup
 */

export const Signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { name, surname, email, phone, password } = req.body;

        if (!email.match(/\S+@\S+\.\S+/)) {
            return sendErrorResponse(res, 400, "Email format is invalid!");
        }

        const [isMailExist, isPhoneExist] = await Promise.all([
            UserModel.findOne({ email }),
            UserModel.findOne({ phone }),
        ]);

        if (isMailExist) {
            return sendErrorResponse(
                res,
                400,
                "This email is already registered!",
            );
        }
        if (isPhoneExist) {
            return sendErrorResponse(
                res,
                400,
                "This phone is already registered!",
            );
        }
        if (password.includes(email)) {
            return sendErrorResponse(
                res,
                400,
                "Password cannot contain your email!",
            );
        }

        const hashedPassword = bcrypt.hashSync(password, 12);
        const emailToken = randomString(20);

        const newUser = new UserModel({
            name,
            surname,
            email,
            phone,
            password: hashedPassword,
            verification_token: emailToken,
        });

        await newUser.save();

        const link = `${process.env.EMAIL_LINK}/${newUser._id}/verify/${emailToken}`;
        verifyEmail(email, name, link);

        res.status(201).json({
            success: true,
            newUser,
            message: "User created successfully!",
            token: generateUserToken(newUser),
        });
        next();
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};

/**
 * @desc VERIFY
 * @route api/auth/user/verify
 */

module.exports.Verify = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await UserModel.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(400).json({ message: "Link is invalid!" });
        }

        user.email_verified = true;
        user.verification_token = "";

        const verified = await user.save();

        res.status(200).send({ success: "true", verified });
    } catch (error) {
        res.status(400).json({
            success: "false",
            message: error,
        });
    }
};

/**
 * @desc LOGIN
 * @route api/auth/login
 */

module.exports.Signin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid email. Please try again." });
        }

        if (!user.email_verified) {
            return res
                .status(400)
                .json({ message: "First, you need to verify your email!" });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res
                .status(400)
                .json({ message: "Invalid password. Please try again." });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
            token: generateUserToken(user),
        });
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

/**
 * @desc LOGIN
 * @route api/auth/users
 */

module.exports.GetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({}).select(
            "-password -_id -verification_token",
        );
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
