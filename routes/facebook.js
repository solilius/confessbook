const express = require("express");
const router = express.Router();
const controller = require("../controllers/facebook.controller");
const validator = require("../middlewares/confession.validator");
const auth = require("../middlewares/auth");

router.use("*", validator);
router.use("*", auth);

// ################### API ################### //

router.route("/").get(controller.getPosts);
router.route("/").post(controller.postToFB);
router.route("/schedule").post(controller.scheduleToFB);
router.route("/:id").put(controller.updatePost);
router.route("/schedule/:id").patch(controller.updateScheduledTime);
router.route("/:id").delete(controller.deletePost);

module.exports = router;