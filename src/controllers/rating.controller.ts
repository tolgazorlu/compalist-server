import { Request, Response } from "express";
import { RatingModel } from "../models/rating.model";
import { CompanyModel } from "../models/company.model";

/**
 * @desc  CREATE Rating
 * @route api/rating/create
 */

module.exports.createRating = async (req: Request, res: Response) => {
    try {
        const { company_name, ...ratingData } = req.body;
        const userId = req.user._id;

        // Create the rating
        const rating = await RatingModel.create({
            ...ratingData,
            company_name,
            owner: userId,
        });

        // Check if the company exists
        const company = await CompanyModel.findOne({ company_name });

        if (company) {
            // If the company exists, update its ratings array
            company.ratings = [...company.ratings!, rating._id];
            await company.save();
            return res.status(201).json({ success: true });
        }

        return res.status(201).json({ success: true });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc GET CONTACT
 * @route api/contact/all
 */

module.exports.getRatings = async (req: Request, res: Response) => {
    try {
        const rating = await RatingModel.find({});
        return res.status(200).json(rating);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.getUserRating = async (req: Request, res: Response) => {
    try {
        const rating = await RatingModel.find({ owner: req.user._id });
        return res.status(200).json(rating);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
