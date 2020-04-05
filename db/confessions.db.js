const Confession = require("../models/confession");

const db = {
  getConfessions: query => {
    return Confession.find(query).sort({ create_date: "asc" });
  },
  getConfession: query => {
    return Confession.findOne(query);
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
  getNextSerial: async () => {
    const [lastConfession] = await Confession.aggregate([
      {
        $group: {
          _id: null,
          serial: {
            $max: "$serial"
          }
        }
      }
    ]);
    return lastConfession ? lastConfession.serial + 1 : 0;
  }
};

module.exports = db;
