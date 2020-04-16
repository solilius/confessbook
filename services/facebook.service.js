const axios = require("axios");
const schedule = require("node-schedule");
const db = require("../db/confessions.db");

schedule.scheduleJob(" 0 0 * * *", async () => {
  const res = await db.updateConfessionByQuery(
    {
      isArchived: false,
      fb_scheduled_date: { $lt: new Date() },
    },
    { $set: { isArchived: true } }
  );
});

const foramtBody = (confession) => {
  let body = {
    access_token: process.env.ACCESS_TOKEN,
    message: `#${confession.serial} ${confession.message}`,
  };
  if (confession.comment) body.message += `\nהערת העורך: ${confession.comment}`;
  return body;
};

const post = async (confession) => {
  try {
    const body = foramtBody(confession);
    const res = await axios.post(
      `https://graph.facebook.com/${process.env.PAGE_ID}/feed`,
      body
    );
    return res.data.id;
  } catch (error) {
    throw new Error(error);
  }
};

const scheduledPost = async (confession) => {
  try {
    const time = new Date(confession.fb_scheduled_date).getTime() / 1000;
    const res = await axios.post(
      `https://graph.facebook.com/${process.env.PAGE_ID}/feed/?published=false&scheduled_publish_time=${time}`,
      foramtBody(confession)
    );
    return res.data.id;
  } catch (error) {
    throw new Error(error);
  }
};

const updateScheduledPost = async (confession) => {
  try {
    const time = new Date(confession.fb_scheduled_date).getTime() / 1000;
    const res = await axios.post(
      `https://graph.facebook.com/${confession.post_id}?published=false&scheduled_publish_time=${time}`,
      foramtBody(confession)
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const updateScheduledTime = async (id, date) => {
  try {
    const time = new Date(date).getTime() / 1000;
    const res = await axios.post(
      `https://graph.facebook.com/${id}?published=false&scheduled_publish_time=${time}`,
      { access_token: process.env.ACCESS_TOKEN }
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const deletePost = async (post_id) => {
  try {
    const res = await axios.delete(
      `https://graph.facebook.com/${post_id}?access_token=${process.env.ACCESS_TOKEN}`
    );
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  post,
  scheduledPost,
  updateScheduledPost,
  updateScheduledTime,
  deletePost,
};
