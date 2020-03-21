const User = require("../models/user");

module.exports = {
  getUser: query => {
    return User.findOne(query);
  }
};
