import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const Auth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer xxxxx
        // console.log(token);

        try {
            const decode = jwt.verify(
                token,
                process.env.TOKEN_KEY || "somethingsecret",
            );

            req.user = decode as {
                _id: string;
                name: string;
                surname: string;
                email: string;
                phone: string;
                role: string;
                email_verified: boolean;
                verification_token: string;
                token: string;
                createdAt: Date;
            };

            next();
        } catch (error) {
            console.error("Token verification error:", error);
            res.status(401).json({ message: "Invalid Token" });
        }
    } else {
        res.status(401).json({ message: "No Token" });
    }
};
