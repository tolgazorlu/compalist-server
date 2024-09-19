import { Router } from "express";
import { Auth } from "../middlewares/user.auth";
import { Admin } from "../middlewares/admin.auth";
const blogController = require("../controllers/blog.controller");

const router: Router = require("express").Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/images/:key", blogController.GetImageFromS3);
router.post("/images", upload.single("image"), blogController.UploadImage);
router.get("/all", blogController.getAllPosts); // ALL BLOGS
router.post("/create", Auth, Admin, blogController.createPost); // CREATE
router.get("/:slug", blogController.getPost); // GET SINGLE BLOG
router.get("/edit/:slug", blogController.getPostForEdit); // GET POST FOR EDIT
router.put("/update/:slug", Auth, blogController.updatePost); // UPDATE
router.delete("/delete/:slug", Auth, blogController.deletePost); // DELETE

module.exports = router;
