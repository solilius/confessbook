const db = require("../db/schedulers.db");
const schedulersManager = require("../services/scheduer.service");

schedulersManager.startSchedulers();

const controller = {
  getSchedulers: async (req, res, next) => {
    try {
      const schedulers = await db.getSchedulers();
      res.send(schedulers);
    } catch (error) {
      next(error);
    }
  },
  insertScheduler: async (req, res, next) => {
    try {
      req.body._id = (await db.insertScheduler(req.body)).id;
      schedulersManager.insertScheduler(req.body);
      res.send({ status: "success" });
    } catch (error) {
      next(error);
    }
  },
  activateScheduler: async (req, res, next) => {
    try {
      await db.updateScheduler(req.params.id, {isActive: req.query.active});
      schedulersManager.activateJob(req.params.id, (req.query.active === "true"));
      res.send({ status: "success" });
    } catch (error) {
      next(error);
    }
  },
  updateScheduler: async (req, res, next) => {
    try {
      req.body.update_date = new Date();
      await db.updateScheduler(req.params.id, req.body);
      req.body._id = req.params.id;
      schedulersManager.updateScheduler(req.params.id, req.body);
      res.send({ status: "success" });
    } catch (error) {
      next(error);
    }
  },
  deleteScheduler: async (req, res, next) => {
    try {
      await db.deleteScheduler(req.params.id);
      schedulersManager.deleteScheduler(req.params.id);
      res.send({ status: "success" });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = controller;
