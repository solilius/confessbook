const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  if (req.method === "POST" || (await validateToken(req.cookies))) {
    next();
  } else {
     res.status(401).send("Authentication Failed");
  }
};

async function validateToken(cookies) {
  if (cookies && cookies.token) {
    try {
      const decoded = await jwt.verify(cookies.token, process.env.SECRET);
      delete decoded.iat;
      const user = await User.findOne(decoded).exec();
      if (user !== null) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
}
