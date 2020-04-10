const db = require("../db/confessions.db");
const facebook = require("../services/facebook.service");

async function populateConfession(confession) {
  confession.serial = await db.getNextSerial();
  confession.update_date = new Date();
  confession.isArchived = true;
  return confession;
}

const getConfessions = async (req, res, next) => {
  try {
    const confessions = await db.getConfessions({
      isArchived: req.query.isArchived,
    });
    res.send(confessions);
  } catch (error) {
    next(error);
  }
};

const insertConfession = async (req, res, next) => {
  try {
    await db.insertConfession(req.body);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const updateConfession = async (req, res, next) => {
  try {
    req.body.update_date = new Date();
    await db.updateConfession(req.params.id, req.body);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const postConfessionToFB = async (req, res, next) => {
  try {
    const confession = await populateConfession(req.body);
    await facebook.post(foramtBody(confession));
    await db.updateConfession(confession._id, confession);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const deleteConfession = async (req, res, next) => {
  try {
    await db.deleteConfession(req.params.id);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConfessions,
  insertConfession,
  updateConfession,
  postConfessionToFB,
  deleteConfession,
};
