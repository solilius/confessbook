const db = require("../db/confessions.db");
const facebook = require("../services/facebook.service");

const controller = {
  getConfessions: async (req, res, next) => {
    try {
      const confessions = await db.getConfessions({
        archived: req.query.archived
      });
      res.send(confessions);
    } catch (error) {
      next(error);
    }
  },
  insertConfession: async (req, res, next) => {
    try {
      await db.insertConfession(req.body);
      res.send({ status: "success" });
    } catch (error) {
      next(error);
    }
  },
  updateConfession: async (req, res, next) => {
    try {
      req.body.update_date = new Date();
      await db.updateConfession(req.params.id, req.body);
      res.send({ status: "success" });
    } catch (error) {
      next(error);
    }
  },
  postConfessionToFB: async (req, res, next) => {
    try {
      const confession = await populateConfession(req.body);
      await facebook.post(foramtBody(confession));
      await db.updateConfession(confession._id, confession);
      res.send({ status: "success" });
    } catch (error) {
      next(error);
    }
  },
  deleteConfession: async (req, res, next) => {
    try {
      await db.deleteConfession(req.params.id);
      res.send({ status: "success" });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = controller;

async function populateConfession(confession) {
  confession.serial = await db.getNextSerial();
  confession.update_date = new Date();
  confession.archived = true;
  return confession;
}
