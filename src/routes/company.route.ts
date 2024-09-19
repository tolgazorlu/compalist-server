import { Router } from "express";
import { Auth } from "../middlewares/user.auth";
import { Admin } from "../middlewares/admin.auth";
const companyController = require("../controllers/company.controller");
const router: Router = require("express").Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/images/:key", companyController.GetImageFromS3);
router.post("/images", upload.single("image"), companyController.UploadImage);
router.put("/update/:company_name", Auth, companyController.UpdateCompany);
router.put("/verify/:company_name", Auth, companyController.VerifyCompany);
router.put("/list/:company_name", Auth, companyController.ListCompany);
router.get("/companyList", Auth, Admin, companyController.getCompanyList);
router.get(
    "/all_companies_for_select",
    companyController.getAllCompaniesForSelect,
);
router.post("/create", Auth, companyController.CreateCompany);
router.get("/user_company", Auth, companyController.getUserCompany);
router.post("/update_visit/:slug", companyController.UploadVisit);
router.post(
    "/update_website_visit/:slug",
    companyController.UploadWebsiteVisit,
);
router.get("/all", companyController.getCompanies);
router.get("/pending", companyController.GetPendingCompanies);
router.get("/search", companyController.getSearchCompanies);
router.get("/:slug", companyController.getCompany);

module.exports = router;
