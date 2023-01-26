const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    nik: Joi.string().min(16).max(16).required(),
    role: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    nik: Joi.string().nik().value(16).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
