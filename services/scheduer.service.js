const schedule = require("node-schedule");
const db_schedulers = require("../db/schedulers.db");
const db_confession = require("../db/confessions.db");
const facebook = require("./facebook.service");

const jobs = [];

const scheduler = {
  startSchedulers: async () => {
    db_schedulers.getSchedulers().then(data => {
      data.forEach(s => {
        jobs.push(getJobObject(s));
      });
    });
  },
  insertScheduler: async scheduler => {
    jobs.push(getJobObject(scheduler));
  },
  updateScheduler: (id, scheduler) => {
    jobs.forEach(job => {
      if (job.id === id) {
        job.job.cancel();
        job = getJobObject(scheduler);
      }
    });
  },
  activateJob: (id, active) => {
    if (active) {
      jobs.find(j => {
        if (j.id === id) {
          j.job.reschedule(j.rule);
          return j;
        } else {
          return false;
        }
      });
    } else {
      jobs.find(j => j.id === id).job.cancel();
    }
  },
  deleteScheduler: id => {
    jobs.forEach((j, i) => {
      if (j.id == id) {
        this.stopJob(j.id);
        jobs.splice(i, 1);
      }
    });
  }
};

module.exports = scheduler;

async function getJobObject(job) {
  const jobObject = {
    id: job._id.toString(),
    rule: job.rule,
    job: schedule.scheduleJob(job.rule, () => {
      handlePosting(job.tag, job.name);
      //console.log(new Date().getSeconds(), job.name);
    })
  };
  if (!job.isActive) jobObject.job.cancel();
  return jobObject;
}
async function handlePosting(tag, name) {
  try {
    let confession = await db_confession.getConfession({
      archived: false,
      tags: tag
    });
    confession.serial = await db_confession.getNextSerial();
    await facebook.post(confession);
    confession.update_date = new Date();
    confession.updated_by = name;
    confession.archived = true;
    db_confession.updateConfession(confession._id, confession);
  } catch (error) {
      // logs
  }
}
