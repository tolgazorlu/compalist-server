import { Router } from "express";
import { Auth } from "../middlewares/user.auth";
const ratingController = require("../controllers/rating.controller");

const router: Router = require("express").Router();

router.get("/all", ratingController.getRatings); // ALL Rating
router.post("/create", Auth, ratingController.createRating); // CREATE
router.get("/user_ratings", Auth, ratingController.getUserRating); // ALL Suggest

module.exports = router;
