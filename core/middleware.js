const httpStatus = require('http-status');
const mongoose = require('mongoose');

const ObjectDoesNotExist = require('./errors');

const OAuth2 = (req, res, next) => {
  req.user = { _id: '643903d6cb8b9e41f0bb02d9' };
  next();
};

// eslint-disable-next-line no-unused-vars
const errorHandler = async (err, req, res, next) => {
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
  return res.status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ message: `Произошла ошибка: ${err.message}` });
};

module.exports = {
  OAuth2,
  errorHandler,
};
