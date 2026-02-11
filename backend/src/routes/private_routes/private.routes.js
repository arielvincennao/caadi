const express = require("express");
const adminController = require("../../controllers/private_controllers/private.controller");

const router = express.Router();

router.get("/sections", adminController.getAllSections); //funca
router.get("/sections/:slug", adminController.getSectionBySlug); //este no esta programado agus.
module.exports = router;
