import { Router } from "express";
const userAuthController = require("../controllers/auth/userAuth.controller");
const router: Router = require("express").Router();

router.get("/all", userAuthController.GetAllUsers);
router.post("/signin", userAuthController.Signin);
router.post("/signup", userAuthController.Signup);
router.put("/:id/verify/:token/", userAuthController.Verify);

module.exports = router;
