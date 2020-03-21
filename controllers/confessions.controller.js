const db = require("../db/confessions.db");
const facebook = require("../services/facebook.service");
const Transaction = require("mongoose-transactions");

const controller = {
  getConfessions: async (req, res, next) => {
    try {
      const confessions = await db.getConfessions(req.query.archived);
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
  confession.serial = await getNextSerial();
  confession.update_date = new Date();
  confession.archived = true;
  return confession;
}

async function getNextSerial() {
  const [lastConfession] = await db.getSerial();
  return lastConfession ? lastConfession.serial + 1 : 0;
}

function foramtBody(confession) {
  let body = {
    access_token: process.env.ACCESS_TOKEN,
    message: `#${confession.serial} ${confession.message}`
  };
  if (confession.comment) body.message += `\nהערת העורך: ${confession.comment}`;
  return body;
}
