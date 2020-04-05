const joi = require("joi");

const schedulerScheme = joi.object().keys({
  name: joi.string().required(),
  isActive: joi.boolean().required(),
  rule: joi.string().required(),
  create_by: joi.string().required(),
  tag: joi.string().required()
});

module.exports = (req, res, next) => {
  if (req.method == "POST" || req.method == "PUT") {
    joi.validate(req.body, schedulerScheme, err => {
      if (err) {
        res.status(400).send(err.details[0].message);
      } else {
        next();
      }
    });
  } else {
    next();
  }
};
