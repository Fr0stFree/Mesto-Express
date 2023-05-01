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
      .uri(),
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

const updateInfoSchema = {
  body: Joi.object().keys({
    name: Joi
      .string()
      .optional()
      .min(2)
      .max(30)
      .alphanum(),
    about: Joi
      .string()
      .optional()
      .min(2)
      .max(30),
  }),
};

const updateAvatarSchema = {
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .required()
      .min(2)
      .max(255)
      .uri(),
  }),
};

const getOneSchema = {
  params: Joi.object().keys({
    userId: Joi
      .string()
      .required(),
  }),
};

module.exports = {
  registerSchema,
  loginSchema,
  getOneSchema,
  updateInfoSchema,
  updateAvatarSchema,
};
