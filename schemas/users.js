const { Joi } = require('celebrate');

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
  getOneSchema,
  updateInfoSchema,
  updateAvatarSchema,
};
