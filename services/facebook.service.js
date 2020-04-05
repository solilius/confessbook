const axios = require("axios");

module.exports = {
  post: async confession => {
    try {
      const body = foramtBody(confession);
      const res = await axios.post(
        `https://graph.facebook.com/${process.env.PAGE_ID}/feed`, body);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  scheduledPost: async (confession, date) => {
    try {
      const res = await axios.post(
        `https://graph.facebook.com/${process.env.PAGE_ID}/feed/?published=false&scheduled_publish_time=${date}`,
        foramtBody(confession)
      );
      return res;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateScheduledPost: async (confession, date) => {
    try {
      const res = await axios.post(
        `https://graph.facebook.com/${confession.fb_id}?published=false&scheduled_publish_time=${date}`,
        foramtBody(confession)
      );
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
};

function foramtBody(confession) {
  let body = {
    access_token: process.env.ACCESS_TOKEN,
    message: `#${confession.serial} ${confession.message}`
  };
  if (confession.comment) body.message += `\nהערת העורך: ${confession.comment}`;
  return body;
}
