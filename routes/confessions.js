const express = require("express");
const router = express.Router();
const controller = require("../controllers/confessions.controller");
const auth = require("../middlewares/auth");

router.use("*", auth);

const Confession = require("../models/confession");
const httpStatus = require("http-status");
const axios = require("axios");

// ################### API ################### //

router.route("/").get(controller.getConfessions);
router.route("/").post(controller.insertConfession);
router.route("/:id").put(controller.updateConfession);
router.route("/:id").delete(controller.deleteConfession);

router.post("/fb", async (req, res, next) => {
  try {
    const [lastConfession] = await Confession.aggregate([
      {
        $group: {
          _id: null,
          serial: {
            $max: "$serial"
          }
        }
      }
    ]);

    let serial = 0;
    if (lastConfession) {
      serial = lastConfession.serial + 1;
    }

    try {
      await axios.post(
        `${process.env.FB_API}/feed`,
        foramtBody(serial, req.body.message, req.body.comment)
      );
      let confession = req.body;
      confession.serial = serial;
      confession.update_date = new Date();
      await Confession.update({ _id: confession._id }, { $set: confession });
      res.status(httpStatus.OK).send({ status: "success" });
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

function foramtBody(sqnc, msg, commnt) {
  let body = {
    access_token: process.env.ACCESS_TOKEN,
    message: `#${sqnc} ${msg}`
  };
  if (commnt) body.message += `\nהערת העורך: ${commnt}`;

  return body;
}
