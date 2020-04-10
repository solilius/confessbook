const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schedulerScheme = Joi.object().keys({
  _id: Joi.objectId(),
  __v: Joi.number(),
  name: Joi.string().required(),
  isActive: Joi.boolean().required(),
  rule: Joi.string().required(),
  create_date: Joi.date().required(),
  update_date: Joi.date(),
  create_by: Joi.string().required(),
  tag: Joi.string().required(),
});

module.exports = (req, res, next) => {
  if (req.method == "POST" || req.method == "PUT") {
    Joi.validate(req.body, schedulerScheme, (err) => {
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
