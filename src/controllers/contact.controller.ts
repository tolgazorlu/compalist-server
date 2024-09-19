import { Request, Response } from "express";
import { ContactModel } from "../models/contact.model";

/**
 * @desc  CREATE CONTACT
 * @route api/contact/create
 */

module.exports.createContact = async (req: Request, res: Response) => {
    try {
        const contact = await ContactModel.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        });
        return res.status(201).json(contact);
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

module.exports.getContacts = async (req: Request, res: Response) => {
    try {
        const contact = await ContactModel.find({});
        return res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
