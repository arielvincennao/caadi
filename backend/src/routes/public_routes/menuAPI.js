const express = require("express");
const menuController = require("../../controllers/public_controllers/menuDB");

const router = express.Router();

router.get("", menuController.getMenu);

module.exports = router;
