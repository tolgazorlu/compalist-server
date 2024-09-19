require("dotenv").config();
const jwt = require("jsonwebtoken");
import { User } from "../models/user.model";

/**
 *
 * @desc GENERATE TOKEN
 */

export const generateUserToken = (user: User) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,

            role: user.role,
        },
        process.env.TOKEN_KEY || "somethingsecret",
        {
            expiresIn: "30d",
        },
    );
};
