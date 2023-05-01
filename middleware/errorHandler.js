const httpStatus = require('http-status');
const mongoose = require('mongoose');

const ObjectDoesNotExist = require('../core/errors');

// eslint-disable-next-line no-unused-vars
module.exports = async (err, req, res, next) => {
  if (err instanceof ObjectDoesNotExist) {
    return res.status(httpStatus.NOT_FOUND)
      .send({ message: err.message });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(httpStatus.BAD_REQUEST)
      .send({ message: err.message });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(httpStatus.BAD_REQUEST)
      .send({ message: err.message });
  }
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(httpStatus.CONFLICT)
      .send({ message: err.message });
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ message: `Произошла ошибка: ${err.message}` });
};
