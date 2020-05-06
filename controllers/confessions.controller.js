const db = require("../db/confessions.db");
const facebook = require("../services/facebook.service");

const getConfessions = async (req, res, next) => {
  try {
    let query = { isArchived: req.query.isArchived };
    if (req.query.isArchived == "false") {
      query.post_id = { $exists: false };
    }
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const confessions = await db.getConfessions(query, limit, page);
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

const updateArchived = async (req, res, next) => {
  try {
    req.body.update_date = new Date();
    await db.updateConfession(req.params.id, {
      isArchived: req.query.isArchived,
      updated_by: req.query.user,
    });
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const deleteConfession = async (req, res, next) => {
  try {
    const confession = await db.getConfession({ _id: req.params.id });
    await db.deleteConfession(req.params.id);
    facebook.deletePost(confession.post_id);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConfessions,
  insertConfession,
  updateArchived,
  updateConfession,
  deleteConfession,
};
