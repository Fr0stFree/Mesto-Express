const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ObjectDoesNotExist = require('./errors');

// eslint-disable-next-line no-unused-vars
const errorHandler = async (err, req, res, next) => {
  if (err instanceof ObjectDoesNotExist) {
    return res.status(httpStatus.NOT_FOUND)
      .send({ message: 'Объект не найден' });
  }
  if (err instanceof mongoose.Error.ValidationError
      || err instanceof mongoose.Error.CastError) {
    return res.status(httpStatus.BAD_REQUEST)
      .send({ message: 'Невалидные данные' });
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ message: `Произошла ошибка: ${err.message}` });
};

module.exports = errorHandler;
