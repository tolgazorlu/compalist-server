import { Router } from "express";
const contactController = require("../controllers/contact.controller");

const router: Router = require("express").Router();

router.get("/all", contactController.getContacts); // ALL BLOGS
router.post("/create", contactController.createContact); // CREATE

module.exports = router;
