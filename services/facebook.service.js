const axios = require("axios");

module.exports = {
  post: async confession => {
    try {
      const res = await axios.post(`https://graph.facebook.com/${process.env.PAGE_ID}/feed`, confession);
      return res;
    } catch (error) {
      throw new Error();
    }
  }
};
