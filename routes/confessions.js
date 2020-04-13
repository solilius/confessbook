const express = require("express");
const router = express.Router();
const controller = require("../controllers/confessions.controller");
const validator = require("../middlewares/confession.validator");
const auth = require("../middlewares/auth");

router.use("*", validator);
//router.use("*", auth);

// ################### API ################### //

router.route("/").get(controller.getConfessions);
router.route("/").post(controller.insertConfession);
router.route("/:id").put(controller.updateConfession);
router.route("/:id").delete(controller.deleteConfession);
// add patch to archive
module.exports = router;