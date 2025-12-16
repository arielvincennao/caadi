const express = require("express");
const adminController = require("../../repositories/private_repositories/private.controller");

const router = express.Router();

router.get("/sections", adminController.getAllSections);
router.get("/sections/:slug", adminController.getSectionBySlug);

module.exports = router;
