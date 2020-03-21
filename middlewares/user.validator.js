const joi = require("joi");

const userScheme = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required()
});

module.exports = (req, res, next) => {
  joi.validate(req.body, userScheme, err => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      next();
    }
  });
};
