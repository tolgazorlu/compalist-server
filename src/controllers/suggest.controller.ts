import { Request, Response } from "express";
import { Status, Suggest, SuggestModel } from "../models/suggest.model";

/**
 * @desc  CREATE SUGGEST
 * @route api/suggest/create
 */

module.exports.createSuggest = async (req: Request, res: Response) => {
    try {
        const suggest = await SuggestModel.create({
            owner: req.user._id,
            name: req.user.name,
            surname: req.user.surname,
            company_name: req.body.company_name,
            email: req.user.email,
            phone: req.user.phone,
            service_selection: req.body.service_selection,
            project_detail: req.body.project_detail,
            status: "pending",
        });
        return res.status(201).json(suggest);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc GET SUGGEST
 * @route api/suggest/all
 */

module.exports.getSuggest = async (req: Request, res: Response) => {
    try {
        const suggest = await SuggestModel.find({});
        return res.status(200).json(suggest);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.getUserSuggests = async (req: Request, res: Response) => {
    try {
        const suggest = await SuggestModel.find({ owner: req.user._id });
        return res.status(200).json(suggest);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.GetPendingSuggest = async (req: Request, res: Response) => {
    try {
        const suggests = await SuggestModel.find({});
        const pendingSuggests = suggests.filter(
            (suggest) => suggest.status === "pending",
        );
        return res.status(200).json(pendingSuggests);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.RejectSuggest = async (req: Request, res: Response) => {
    try {
        const suggest = await SuggestModel.findById(req.params.id);
        if (suggest) {
            suggest.status = Status.Rejected;
            const updatedSuggest = await suggest.save();
            res.send({ updatedSuggest });
        } else {
            res.status(400).json({
                message: "Suggest not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.ConfirmSuggest = async (req: Request, res: Response) => {
    try {
        const suggest = await SuggestModel.findById(req.params.id);
        if (suggest) {
            suggest.status = Status.Done;
            const updatedSuggest = await suggest.save();
            res.send({ updatedSuggest });
        } else {
            res.status(400).json({
                message: "Suggest not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
