const express = require("express");
const sectionController = require("../../controllers/public_controllers/sectionBySlugDB");

const router = express.Router();

router.get("/:slug", sectionController.getSectionBySlug);

module.exports = router;
