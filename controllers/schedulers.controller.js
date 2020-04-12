const db = require("../db/schedulers.db");
const schedulersManager = require("../services/scheduer.service");

schedulersManager.startSchedulers();

const getSchedulers = async (req, res, next) => {
  try {
    const schedulers = await db.getSchedulers();
    res.send(schedulers);
  } catch (error) {
    next(error);
  }
};

const getTags = async (req, res, next) => {
  try {
    const schedulers = await db.getTags();
    res.send(schedulers);
  } catch (error) {
    next(error);
  }
};

const insertScheduler = async (req, res, next) => {
  try {
    req.body._id = (await db.insertScheduler(req.body)).id;
    schedulersManager.insertScheduler(req.body);
    res.send({ _id: req.body._id });
  } catch (error) {
    next(error);
  }
};

const activateScheduler = async (req, res, next) => {
  try {
    await schedulersManager.activateJob(
      req.params.id,
      req.query.active === "true"
    );
    await db.updateScheduler(req.params.id, { isActive: req.query.active });
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const updateScheduler = async (req, res, next) => {
  try {
    req.body.update_date = new Date();
    await db.updateScheduler(req.params.id, req.body);
    req.body._id = req.params.id;
    schedulersManager.updateScheduler(req.params.id, req.body);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const deleteScheduler = async (req, res, next) => {
  try {
    await schedulersManager.deleteScheduler(req.params.id);
    await db.deleteScheduler(req.params.id);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSchedulers,
  getTags,
  insertScheduler,
  activateScheduler,
  updateScheduler,
  deleteScheduler,
};
