const db = require("../db/confessions.db");
const facebook = require("../services/facebook.service");

async function populateConfession(confession) {
  confession.serial = await db.getNextSerial();
  confession.update_date = new Date();
  return confession;
}

const getPosts = async (req, res, next) => {
  try {
    const confessions = await db.getConfessions({
      isArchived: false,
      post_id: { $exists: true },
    });

    res.send(
      confessions.sort((a, b) => {
        return a.fb_scheduled_date < b.fb_scheduled_date
          ? -1
          : a.fb_scheduled_date > b.fb_scheduled_date
          ? 1
          : 0;
      })
    );
  } catch (error) {
    next(error);
  }
};

const postToFB = async (req, res, next) => {
  try {
    const confession = await populateConfession(req.body);
    confession.isArchived = true;
    confession.post_id = await facebook.post(confession);
    await db.updateConfession(confession._id, confession);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const scheduleToFB = async (req, res, next) => {
  try {
    const confession = await populateConfession(req.body);
    confession.post_id = await facebook.scheduledPost(confession);
    await db.updateConfession(confession._id, confession);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    await facebook.updateScheduledPost(req.body);
    await db.updateConfession(req.params.id, req.body);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const updateScheduledTime = async (req, res, next) => {
  try {
    await facebook.updateScheduledTime(req.params.id, req.query.date);
    await db.updateConfessionByQuery(
      { post_id: req.params.id },
      {
        $set: { fb_scheduled_date: req.query.date, updated_by: req.query.user },
      }
    );
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    await facebook.deletePost(req.params.id);
    await db.updateConfessionByQuery(
      { post_id: req.params.id },
      {
        $unset: { post_id: 1, fb_scheduled_date: 1, serial: 1 },
        updated_by: req.query.user,
      }
    );
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  postToFB,
  updatePost,
  updateScheduledTime,
  scheduleToFB,
  deletePost,
};
