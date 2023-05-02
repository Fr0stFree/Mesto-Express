const { Joi } = require('celebrate');

const createSchema = {
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30),
    link: Joi
      .string()
      .required()
      .uri(),
  }),
};

const getOneSchema = {
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .required()
      .hex()
      .length(24),
  }),
};

module.exports = {
  createSchema,
  getOneSchema,
};
