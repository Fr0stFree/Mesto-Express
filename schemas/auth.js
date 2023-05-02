const { Joi } = require('celebrate');
const { URL_PATTERN } = require('../core/settings');

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
      .optional()
      .min(2)
      .max(30),
    about: Joi
      .string()
      .optional()
      .min(2)
      .max(30),
    avatar: Joi
      .string()
      .optional()
      .max(255)
      .pattern(URL_PATTERN),
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
