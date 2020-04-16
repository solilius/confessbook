const schedule = require("node-schedule");
const db_schedulers = require("../db/schedulers.db");
const db_confession = require("../db/confessions.db");
const facebook = require("./facebook.service");

const jobs = [];

const getJobObject = (job) => {
  const jobObject = {
    id: job._id.toString(),
    rule: job.rule,
    job: schedule.scheduleJob(job.rule, () => {
      handlePosting(job.tag, job.name);
    }),
  };
  if (!job.isActive) jobObject.job.cancel();
  return jobObject;
};

const handlePosting = async (tag, name) => {
  try {
    const confession = await db_confession.getConfession({
      isArchived: false,
      tags: tag,
    });
    confession.serial = await db_confession.getNextSerial();
    await facebook.post(confession);
    confession.update_date = new Date();
    confession.updated_by = name;
    confession.isArchived = true;
    db_confession.updateConfession(confession._id, confession);
  } catch (error) {
      
  }
};

const startSchedulers = async () => {
  const data = await db_schedulers.getSchedulers();
  data.forEach((s) => {
    jobs.push(getJobObject(s));
  });
};

const insertScheduler = async (scheduler) => {
  jobs.push(getJobObject(scheduler));
};

const updateScheduler = (id, scheduler) => {
  return new Promise((resolve, reject) => {
    jobs.forEach((job) => {
      if (job.id === id) {
        job.job.cancel();
        job = getJobObject(scheduler);
      }
    });
    resolve();
  });
};

const activateJob = (id, active) => {
  return new Promise((resolve, reject) => {
    if (active) {
      jobs.forEach((j) => {
        if (j.id === id) {
          j.job.schedule(j.rule);
        }
      });
    } else {
      jobs.find((j) => j.id === id).job.cancel();
    }
    resolve();
  });
};

const deleteScheduler = (id) => {
  return new Promise((resolve, reject) => {
    jobs.forEach((j, i) => {
      if (j.id == id) {
        activateJob(j.id, false);
        jobs.splice(i, 1);
      }
    });
    resolve();
  });
};

const getNextScheduledDate = (rule) => {
  const temp = schedule.scheduleJob(rule, () => {});
  const date = temp.nextInvocation();
  temp.cancel();
  return date;
};

module.exports = {
  startSchedulers,
  insertScheduler,
  updateScheduler,
  activateJob,
  deleteScheduler,
  getNextScheduledDate,
};
