const { Joi } = require('celebrate');
const { URL_PATTERN } = require('../core/settings');

const updateInfoSchema = {
  body: Joi.object().keys({
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
  }),
};

const updateAvatarSchema = {
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .required()
      .min(2)
      .pattern(URL_PATTERN),
  }),
};

const getOneSchema = {
  params: Joi.object().keys({
    userId: Joi
      .string()
      .required()
      .hex()
      .length(24),
  }),
};

module.exports = {
  getOneSchema,
  updateInfoSchema,
  updateAvatarSchema,
};
