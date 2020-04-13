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
    res.send(confessions);
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
    await db.updateConfession(req.body);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    await facebook.deletePost(req.params.id);
    res.send({ status: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  updatePost,
  postToFB,
  scheduleToFB,
  deletePost,
};
