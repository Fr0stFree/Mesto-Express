const httpStatus = require('http-status');

const settings = require('../core/settings');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'No token provided' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, settings.SECRET_KEY);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Token is not valid' });
  }
  req.user = payload;
  return next();
};
