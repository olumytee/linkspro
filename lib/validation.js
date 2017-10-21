const Joi = require('joi');

const userSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
});

const linkSchema = Joi.object().keys({
  url: Joi.string()
    .uri()
    .required(),
  collection: Joi.string().required()
});

const linkUpdateSchema = Joi.object().keys({
  url: Joi.string().uri()
});

const userUpdateSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string()
});

const collectionSchema = Joi.object().keys({
  username: Joi.string().required()
});

const validate = schema => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      if (result.error.isJoi) {
        return res.status(400).json({
          error: result.error.name,
          message: result.error.details[0].message
        });
      }
      return res.status(400).json(result.error);
    } else {
      if (!req.value) {
        req.value = {};
      }
      if (!req.value.body) {
        req.value.body = {};
      }
      req.value.body = result.value;
      next();
    }
  };
};

module.exports = {
  userSchema,
  userUpdateSchema,
  collectionSchema,
  validate,
  linkSchema,
  linkUpdateSchema
};
