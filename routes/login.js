const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", (req, res) => {
  const userData = req.body;
  User.findOne(userData).then(data => {
    if (data) {
      const token = jwt.sign(userData, process.env.SECRET);
      res.cookie("token", token);
      res.send({status: 'sucess'});
    } else {
      res.status(401).send("Login Failed");
    }
  });
});

module.exports = router;
