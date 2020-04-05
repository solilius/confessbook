const Confession = require("../models/confession");

const db = {
  getConfessions: query => {
    return Confession.find(query).sort({ create_date: "asc" });
  },
  insertConfession: confession => {
    return Confession.create(confession);
  },
  updateConfession: (id, newConfession) => {
    return Confession.updateOne({ _id: id }, { $set: newConfession });
  },

  deleteConfession: id => {
    return Confession.deleteOne({ _id: id });
  },
  getSerial: () => {
    return Confession.aggregate([
      {
        $group: {
          _id: null,
          serial: {
            $max: "$serial"
          }
        }
      }
    ]);
  }
};

module.exports = db;
