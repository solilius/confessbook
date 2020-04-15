const Confession = require("../models/confession");

const getConfessions = (query) => {
  return Confession.find(query).sort({ create_date: "asc" });
};

const getConfession = (query) => {
  return Confession.findOne(query);
};

const insertConfession = (confession) => {
  return Confession.create(confession);
};

const updateConfession = (id, newConfession) => {
  return Confession.updateOne({ _id: id }, { $set: newConfession });
};

const updateConfessionByQuery = (query, newConfession) => {
  return Confession.updateOne(query, { $set: newConfession });
};

const deleteConfession = (id) => {
  return Confession.deleteOne({ _id: id });
};

const getNextSerial = async () => {
  const [lastConfession] = await Confession.aggregate([
    {
      $group: {
        _id: null,
        serial: {
          $max: "$serial",
        },
      },
    },
  ]);
  return lastConfession ? lastConfession.serial + 1 : 0;
};

module.exports = {
  getConfessions,
  getConfession,
  insertConfession,
  updateConfession,
  updateConfessionByQuery,
  deleteConfession,
  getNextSerial,
};
