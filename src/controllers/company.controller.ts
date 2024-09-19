import { Response, Request, NextFunction } from "express";
import { CompanyModel } from "../models/company.model";
import slugify from "slugify";
import { Company } from "../types/company";
import { uploadFile } from "../services/s3/uploadImage";

const { getFileStream } = require("../services/s3/downloadImage");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const validationErrors = require("../utils/validationErrors"); // Import the module at the top of your controller file

/**
 * @desc Create
 * @route api/company/create
 */

module.exports.CreateCompany = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { company_name } = req.body;

        // Validating Email
        const existingCompany = await CompanyModel.findOne({ company_name });
        if (existingCompany) {
            return validationErrors.handleExistingCompanyError(res);
        }

        if (!req.user) {
            return validationErrors.handleUserNotAuthenticatedError(res);
        }

        // Creating new company
        const addCompany = async (companyData: Company) => {
            const user = await CompanyModel.create({
                ...companyData,
                isVerified: false,
                owner: req.user._id,
                hourly_price: companyData.hourly_price || "-",
                slug: slugify(companyData.company_name),
            });
            return user;
        };

        const newCompany = await addCompany({
            ...req.body,
        });

        res.status(201).json({
            success: true,
            company_name: newCompany.company_name,
        });
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
};

exports.UpdateCompany = async (req: Request, res: Response) => {
    try {
        const company = await CompanyModel.findOne({
            company_name: req.params.company_name,
        });
        if (company) {
            company.company_name =
                req.body.company_name || company.company_name;
            company.slogan = req.body.slogan || company.slogan;
            company.hourly_price =
                req.body.hourly_price || company.hourly_price;
            company.founded_year =
                req.body.founded_year || company.founded_year;
            company.numbers_of_employee =
                req.body.numbers_of_employee || company.numbers_of_employee;
            company.numbers_of_customers =
                req.body.numbers_of_customers || company.numbers_of_customers;
            company.website_link =
                req.body.website_link || company.website_link;
            company.category = req.body.category || company.category;
            company.sub_categories =
                req.body.sub_categories || company.sub_categories;
            company.city = req.body.city || company.city;
            company.company_describe =
                req.body.company_describe || company.company_describe;
            company.visits = company.visits;
            company.logo = req.body.logo || company.logo;
            company.slug = company.slug;
            company.isVerified = false;
            company.isListed = false;

            const updatedCompany = await company.save();
            res.send({ updatedCompany });
        } else {
            res.status(400).json({
                message: "Company not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

exports.VerifyCompany = async (req: Request, res: Response) => {
    try {
        const company = await CompanyModel.findOne({
            company_name: req.params.company_name,
        });
        if (company) {
            company.isVerified = !company.isVerified;

            const updatedCompany = await company.save();
            res.send({ updatedCompany });
        } else {
            res.status(400).json({
                message: "Company not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

exports.ListCompany = async (req: Request, res: Response) => {
    try {
        const company = await CompanyModel.findOne({
            company_name: req.params.company_name,
        });
        if (company) {
            company.isListed = !company.isListed;

            const updatedCompany = await company.save();
            res.send({ updatedCompany });
        } else {
            res.status(400).json({
                message: "Company not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

exports.getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const categories = await CompanyModel.find().distinct("category");
        res.send(categories);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

exports.getSearchCompanies = async (req: Request, res: Response) => {
    const searchQuery = req.query.query || "";
    const category = req.query.category || "";

    const queryFilter: any = {};

    if (searchQuery && searchQuery !== "all") {
        queryFilter.$or = [
            { company_name: { $regex: searchQuery, $options: "i" } },
            { category: { $regex: searchQuery, $options: "i" } },
        ];
    }

    if (category && category !== "all") {
        queryFilter.category = category;
    }

    try {
        const companies = await CompanyModel.find(
            queryFilter,
            "-_id -owner -email -phone -password -createdAt -updatedAt -__v -verification_token",
        );
        const verifiedCompanies = companies.filter(
            (company) => company.isListed === true,
        );

        res.send(verifiedCompanies);
    } catch (error) {
        res.status(500).send({ message: "Error searching companies", error });
    }
};

/**
 * @desc GET ALL COMPANIES
 * @route api/company/all
 */

exports.getCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await CompanyModel.find({});
        if (companies) {
            res.status(200).send(companies);
        } else {
            res.status(400).json({
                message: "Companies not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

exports.getCompanyList = async (req: Request, res: Response) => {
    try {
        const companies = await CompanyModel.find(
            {},
            "-_id -slogan -hourly_price -numbers_of_employee -numbers_of_customers -website_link -category -sub_categories -city -company_describe -visits -rating -updatedAt -__v",
        ).populate(
            "owner",
            "-password -createdAt -updatedAt -__v -verification_token -role -email_verified -_id",
        );
        if (companies) {
            res.status(200).send(companies);
        } else {
            res.status(400).json({
                message: "Companies not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc GET SINGLE PROBLEM
 * @route api/company/:slug
 */

exports.getCompany = async (req: Request, res: Response) => {
    try {
        const problem = await CompanyModel.findOne({ slug: req.params.slug })
            .populate({
                path: "ratings",
                select: "createdAt company_position general_rating rating_title rating_detail service_quality time_management company_communication",
                populate: {
                    path: "owner",
                    select: "name surname", // Select fields from the owner you want to include
                },
            })
            .select("-_id -owner -updatedAt -__v");
        if (problem) {
            res.status(200).send(problem);
        } else {
            res.status(400).json({
                message: "Company not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.GetPendingCompanies = async (req: Request, res: Response) => {
    try {
        const company = await CompanyModel.find({});
        const pendingCompany = company.filter(
            (company) => company.isListed === false,
        );
        return res.status(200).json(pendingCompany);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc GET USER COMPANY
 * @route api/company/user_company
 */

exports.getUserCompany = async (req: Request, res: Response) => {
    try {
        const company = await CompanyModel.findOne(
            { owner: req.user._id },
            "-_id -owner -updatedAt -__v -verification_token -email -phone -password -rating",
        );
        if (company) {
            res.status(200).send(company);
        } else {
            res.status(400).json({
                message: "Company not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc UPLOAD COMPANY VISIT
 * @route api/company/upload_visit
 */

module.exports.UploadVisit = async (req: Request, res: Response) => {
    try {
        const company = await CompanyModel.findOne({ slug: req.params.slug });
        if (company && company.visits !== undefined) {
            company.visits += 1;
            await company.save();
            res.status(200).send(company);
        } else {
            return res.status(404).json({ message: "Company not found!" });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc UPLOAD COMPANY VISIT
 * @route api/company/upload_website_visit
 */

module.exports.UploadWebsiteVisit = async (req: Request, res: Response) => {
    try {
        const company = await CompanyModel.findOne({ slug: req.params.slug });
        if (company && company.website_visits !== undefined) {
            company.website_visits += 1;
            await company.save();
            res.status(200).send(company);
        } else {
            return res.status(404).json({ message: "Company not found!" });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc UPLOAD USER AVATAR TO S3 BUCKET
 * @route api/user/images
 */

module.exports.UploadImage = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        await uploadFile(file);
        await unlinkFile(file.path);
        const path = file.path.split("/")[1];
        return res.send({ imagePath: `/images/${path}` });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc GET USER AVATAR FROM S3 BUCKET
 * @route api/user/images/:key
 */

module.exports.GetImageFromS3 = async (req: Request, res: Response) => {
    if (req.params.key) {
        const key = req.params.key;
        getFileStream(key).then((data: any) => data.Body.pipe(res));
    }
};

exports.getAllCompaniesForSelect = async (req: Request, res: Response) => {
    try {
        const company = await CompanyModel.distinct("company_name");
        if (company) {
            res.status(200).send(company);
        } else {
            res.status(400).json({
                message: "Companies not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
