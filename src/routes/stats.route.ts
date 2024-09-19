import { Router } from "express";
import { Auth } from "../middlewares/user.auth";
import { Admin } from "../middlewares/admin.auth";
const statsController = require("../controllers/stats.controller");

const router: Router = require("express").Router();

router.get("/user", Auth, Admin, statsController.getUserCount);
router.get("/notification", Auth, Admin, statsController.getNotification);
router.get("/company", Auth, Admin, statsController.getCompanyCount);
router.get("/suggest", Auth, Admin, statsController.getSuggestCount);
router.get("/rating", Auth, Admin, statsController.getRatingCount);

module.exports = router;
