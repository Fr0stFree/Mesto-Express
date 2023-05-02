const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const { SECRET_KEY } = require('../core/settings');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'No token provided' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Token is not valid' });
  }
  req.user = payload;
  return next();
};
