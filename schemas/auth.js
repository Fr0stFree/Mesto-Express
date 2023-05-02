const { Joi } = require('celebrate');

const registerSchema = {
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .lowercase()
      .max(255),
    password: Joi
      .string()
      .required()
      .min(8)
      .max(255),
    name: Joi
      .string()
      .required()
      .alphanum()
      .min(2)
      .max(30),
    about: Joi
      .string()
      .required()
      .min(2)
      .max(30),
    avatar: Joi
      .string()
      .required()
      .min(2)
      .max(255)
      .pattern(/^https?:(www\.)?[a-zа-яё\d\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
  }),
};

const loginSchema = {
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .lowercase()
      .max(255),
    password: Joi
      .string()
      .required()
      .min(8)
      .max(255),
  }),
};

module.exports = {
  registerSchema,
  loginSchema,
};
