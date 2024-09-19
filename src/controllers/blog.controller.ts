import { Response, Request, NextFunction } from "express";
import { PostModel } from "../models/post.model";
import { uploadFile } from "../services/s3/uploadImage";

const { getFileStream } = require("../services/s3/downloadImage");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

/**
 * @desc CREATE New Blog
 * @route api/blog/create
 */

module.exports.createPost = async (req: Request, res: Response) => {
    try {
        const post = await PostModel.create({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            category: req.body.category,
            sub_categories: req.body.sub_categories,
            author: req.user._id,
            about: req.body.about,
            slug: req.body.slug,
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc GET SINGLE POST
 * @route api/problems/:slug
 */

module.exports.getPost = async (req: Request, res: Response) => {
    try {
        const post = await PostModel.findOne({ slug: req.params.slug })
            .populate({
                path: "author",
                select: "avatar name surname -_id",
            })
            .select("-_id -__v -createdAt");
        if (post) {
            res.status(200).send(post);
        } else {
            res.status(400).json({
                message: "Post not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports.getPostForEdit = async (req: Request, res: Response) => {
    try {
        const post = await PostModel.findOne({ slug: req.params.slug });
        if (post) {
            res.status(200).send(post);
        } else {
            res.status(400).json({
                message: "Post not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc Get All Blogs
 * @route api/blog/all
 */

module.exports.getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const blogs = await PostModel.find()
            .populate({
                path: "author",
                select: "avatar name surname -_id",
            })
            .select("-_id -__v -content -categories ");
        res.send(blogs);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

/**
 * @desc UPDATE POST
 * @route api/blog/update/:id
 */

exports.updatePost = async (req: Request, res: Response) => {
    try {
        const post = await PostModel.findOne({ slug: req.params.slug });
        if (post) {
            post.title = req.body.post.title;
            post.content = req.body.post.content;
            post.image = req.body.post.image;
            post.category = req.body.post.category;
            post.sub_categories = req.body.post.sub_categories;
            post.about = req.body.post.about;
            post.slug = req.body.post.slug;
            const updatedPost = await post.save();
            res.send({ updatedPost });
        } else {
            res.status(400).json({
                message: "Post not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

/**
 * @desc DELETE POST
 * @route api/blog/delete/:id
 */

exports.deletePost = async (req: Request, res: Response) => {
    try {
        const post = await PostModel.findOne({ slug: req.params.slug });
        if (post) {
            const deletedPost = await post.deleteOne();
            res.status(200).send({
                message: "success",
                problem: deletedPost,
            });
        } else {
            res.status(400).json({
                message: "Post not found!",
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

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
