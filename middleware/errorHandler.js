const httpStatus = require('http-status');
const mongoose = require('mongoose');

const {
  PermissionDenied,
  ObjectDoesNotExist,
  InvalidCredentials,
  PageNotFound,
} = require('../core/errors');

module.exports = async (err, req, res, next) => {
  if (err instanceof ObjectDoesNotExist) {
    return res.status(err.statusCode)
      .send({ message: err.message });
  }
  if (err instanceof PermissionDenied) {
    return res.status(err.statusCode)
      .send({ message: err.message });
  }
  if (err instanceof InvalidCredentials) {
    return res.status(err.statusCode)
      .send({ message: err.message });
  }
  if (err instanceof PageNotFound) {
    return res.status(err.statusCode)
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
