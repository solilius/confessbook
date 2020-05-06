const Confession = require("../models/confession");

const getConfessions = (query, limit, page) => {
  return Confession.find(query)
    .limit(limit || null)
    .skip(limit * (page - 1) || 0)
    .sort({ create_date: "asc" });
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

const updateConfessions = (query, newConfession) => {
  return Confession.updateMany(query, { $set: newConfession });
};

const updateConfessionByQuery = (query, setQuery) => {
  return Confession.updateMany(query, setQuery);
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
  updateConfessions,
  updateConfessionByQuery,
  deleteConfession,
  getNextSerial,
};
