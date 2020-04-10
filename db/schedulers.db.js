const Scheduler = require("../models/scheduler");
const Confession = require("../models/confession");

const getSchedulers = () => {
  return Scheduler.find();
};

const getTags = async () => {
  const confessions = await Confession.find({ isArchived: false }, { tags: 1 });
  const schedulers = await Scheduler.find({}, { tag: 1 });
  let tags = [];
  confessions.forEach((confession) => { tags = tags.concat(confession.tags) });
  schedulers.forEach((scheduler) => { tags.push(scheduler.tag) });

  return tags.filter((item, index) => tags.indexOf(item) === index);
};

const insertScheduler = (scheduler) => {
  return Scheduler.create(scheduler);
};

const updateScheduler = (id, newScheduler) => {
  return Scheduler.updateOne({ _id: id }, { $set: newScheduler });
};

const deleteScheduler = (id) => {
  return Scheduler.deleteOne({ _id: id });
};

module.exports = {
  getSchedulers,
  getTags,
  insertScheduler,
  updateScheduler,
  deleteScheduler,
};
