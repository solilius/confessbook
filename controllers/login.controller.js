const jwt = require("jsonwebtoken");
const db = require("../db/users.db");

module.exports = {
  login: async (req, res) => {
    const data = await db.getUser(req.body);
    if (data) {
      res.cookie("token", jwt.sign(req.body, process.env.SECRET));
      res.send({ status: "success" });
    } else {
      res.status(401).send({status: "fail" });
    }
  },
};

