import { Request, Response } from "express";
import { Company, CompanyModel } from "../models/company.model";
import { UserModel } from "../models/user.model";
import { SuggestModel } from "../models/suggest.model";
import { RatingModel } from "../models/rating.model";

module.exports.getUserCount = async (req: Request, res: Response) => {
    try {
        const userCount = await UserModel.countDocuments({});
        return res.status(200).json(userCount);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.getCompanyCount = async (req: Request, res: Response) => {
    try {
        const companyCount = await CompanyModel.countDocuments({});
        return res.status(200).json(companyCount);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.getSuggestCount = async (req: Request, res: Response) => {
    try {
        const suggestCount = await SuggestModel.countDocuments({});
        return res.status(200).json(suggestCount);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.getRatingCount = async (req: Request, res: Response) => {
    try {
        const ratingCount = await RatingModel.countDocuments({});
        return res.status(200).json(ratingCount);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.getNotification = async (req: Request, res: Response) => {
    try {
        const companyNotificationCount = await CompanyModel.countDocuments({
            isListed: false,
        });
        const suggestNotificationCount = await SuggestModel.countDocuments({
            status: "pending",
        });
        return res
            .status(200)
            .json(companyNotificationCount + suggestNotificationCount);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
