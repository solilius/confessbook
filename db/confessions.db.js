const Confession = require("../models/confession");

const db = {
  getConfessions: archived => {
    return Confession.find({ archived: archived }).sort({ create_date: "asc" });
  },
  insertConfession: confession => {
    return Confession.create(confession);
  },
  updateConfession: (id, newConfession) => {
    return Confession.update({_id: id}, { $set: newConfession });
  },

  deleteConfession: id => {
    return Confession.deleteOne({ _id: id });
  }
};

module.exports = db;
