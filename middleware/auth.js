const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const User = require('../models/users');
const settings = require('../core/settings');

module.exports = async (req, res, next) => {
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
  req.user = await User.findById(payload.userId);
  return next();
};
