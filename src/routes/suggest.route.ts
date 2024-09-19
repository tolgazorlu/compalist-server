import { Router } from "express";
const suggestController = require("../controllers/suggest.controller");
import { Auth } from "../middlewares/user.auth";
import { Admin } from "../middlewares/admin.auth";

const router: Router = require("express").Router();

router.put("/reject/:id", Auth, Admin, suggestController.RejectSuggest);
router.put("/confirm/:id", Auth, Admin, suggestController.ConfirmSuggest);
router.post("/create", Auth, suggestController.createSuggest); // CREATE
router.get("/all", Auth, Admin, suggestController.getSuggest); // ALL Suggest
router.get("/user_suggests", Auth, suggestController.getUserSuggests); // ALL Suggest
router.get("/pending", Auth, Admin, suggestController.GetPendingSuggest); // ALL Suggest

module.exports = router;
