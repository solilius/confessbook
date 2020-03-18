const express = require("express");
const httpStatus = require("http-status");
const Confession = require("../models/confession");
const axios = require("axios");
const auth = require("../middlewares/auth");
const router = express.Router();

router.use("*", auth);

// ################### API ################### //

router.get("/", (req, res) => {
  Confession.find({ archived: req.query.archived }).sort({create_date: 'asc'}).then(data => {
    res.send(data);
  });
});

router.put("/unarchive/:id", async (req, res, next) => {
    try {
        await Confession.update({ _id: req.params.id }, { 'archived': false });
        res.send({status:'success'});
    } catch (error) {
        next(error);
    }    
});

router.post("/", async (req, res, next) => {
    try {
        await Confession.create({ message: req.body.message });
        res.send({status:'success'});
    } catch (error) {
        next(error);
    }
});

router.put("/", async (req, res, next) => {
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
      serial = lastConfession.serial +1;
    }
    
    try {
      await axios.post(`${process.env.FB_API}/feed`, foramtBody(serial, req.body.message, req.body.comment));
      let confession = req.body;
      confession.serial = serial;
      confession.update_date = new Date();
      await Confession.update({ _id: confession._id }, { $set: confession });
      res.status(httpStatus.OK).send({status:'success'});
    } catch (error) {
        throw new Error(error);
    }
  } catch (error) {
      next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Confession.update({ _id: req.params.id }, { $set: { archived: true, update_date: new Date(), updated_by: req.query.user } })
    res.send({status:'success'});
      
  } catch (error) {
      next(error);
  }  
});

module.exports = router;


function foramtBody(sqnc, msg, commnt) {
    let body = {
        access_token: process.env.ACCESS_TOKEN,
        message: `#${sqnc} ${msg}`
    }
  if (commnt) body.message += `\nהערת העורך: ${commnt}`;

  return body;
}