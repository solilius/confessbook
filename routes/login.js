const express = require("express");
const router = express.Router();

const controller = require("../controllers/login.controller");
const validator = require("../middlewares/user.validator");
router.use("*", validator);

router.route("/").post(controller.login);

module.exports = router;
