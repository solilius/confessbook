const Scheduler = require("../models/scheduler");

const db = {
  getSchedulers: () => {
    return Scheduler.find();
  },
  insertScheduler: scheduler => {
    return Scheduler.create(scheduler);
  },
  updateScheduler: (id, newScheduler) => {
    return Scheduler.updateOne({ _id: id }, { $set: newScheduler });
  },
  deleteScheduler: id => {
    return Scheduler.deleteOne({ _id: id });
  }
};

module.exports = db;