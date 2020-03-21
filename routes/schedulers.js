const express = require("express");
const schedule = require("node-schedule");
const Scheduler = require("../models/scheduler");
const router = express.Router();

const jobs = [];

const job1 = {
  create_by: "solelan",
  name: "job1",
  tag: "tag1",
  rule: " * * * * * * ",
  isRepeatable: true,
  isActive: true
};

const job2 = {
  create_by: "solelan",
  name: "job2",
  tag: "tag2",
  rule: " * * * * * * ",
  isRepeatable: true,
  isActive: true
};
//CreateScheduler(job1);
//CreateScheduler(job2);

// Scheduler.find().then(data => {
//   data.forEach(s => {
//     jobs.push(getJobObject(s));
//     if (!s.isActive) stopJob(s._id);
//   });
// });

module.exports = router;





function CreateScheduler(scheduler) {
  Scheduler.create(scheduler);
}

function stopJob(id) {
  jobs.find(j => j.id === id).job.cancel();
}

function deleteJob(id) {
  jobs.forEach((j, i) => {
    if (j.id == id) {
      stopJob(j.id);
      jobs.splice(i, 1);
      Scheduler.deleteOne({_id: id}, (err) => { });
    }
  });
}

function getJobObject(job) {
  return {
    id: job._id,
    job: schedule.scheduleJob(job.rule, () => {
      console.log("Posted to FB: " + job._id);
      if (!job.isRepeatable) deleteJob(job._id);
    })
  };
}


