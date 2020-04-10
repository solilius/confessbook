

const express = require("express");
const router = express.Router();
const controller = require("../controllers/schedulers.controller");
const validator = require("../middlewares/scheduler.validator");

router.use("*", validator);

// ################### API ################### //

router.route("/").get(controller.getSchedulers);
router.route("/tags").get(controller.getTags);
router.route("/").post(controller.insertScheduler);
router.route("/:id").put(controller.updateScheduler);
router.route("/:id").patch(controller.activateScheduler);
router.route("/:id").delete(controller.deleteScheduler);

module.exports = router;