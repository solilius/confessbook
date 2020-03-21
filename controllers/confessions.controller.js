const db = require("../db/confessions.db");

const controller = {
  getConfessions: async (req, res) => {
    const confessions = await db.getConfessions(req.query.archived);
    res.send(confessions);
  },
  insertConfession: async (req, res) => {
    await db.insertConfession(req.body);
    res.send({ status: "success" });
  },
  updateConfession: async (req, res) => {
    req.body.update_date = new Date();
    await db.updateConfession(req.params.id, req.body);
    res.send({ status: "success" });
  },
  deleteConfession: async (req, res) => {
    await db.deleteConfession(req.params.id);
    res.send({ status: "success" });
  }
};

module.exports = controller;
