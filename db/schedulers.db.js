const Scheduler = require("../models/scheduler");
const Confession = require("../models/confession");

const getSchedulers = () => {
  return Scheduler.find();
};

const addTag = (tags, tag, isScheduler) => {
  const val = isScheduler ? 0 : 1;
  let index = -1;
  if(tags.length === 0) tags.push({name: tag, value: val});
  tags.forEach((obj, i) => {
      if(obj.name === tag) {
         index = i;
      }   
  }); 
  if(index !== -1){
      tags[index].value = tags[index].value + val;
  } else {
      tags.push({name: tag, value: val});
  }
  return tags;
};

const getTags = async () => {
  const confessions = await Confession.find({ isArchived: false }, { tags: 1 });
  const schedulers = await Scheduler.find({}, { tag: 1 });

  let tags = [];
  confessions.forEach((confession) => {
    confession.tags.forEach((tag) => (tags = addTag(tags, tag, false)));
  });
  schedulers.forEach((scheduler) => {
    tags = addTag(tags, scheduler.tag, true);
  });

  return tags;
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


