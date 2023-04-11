const httpStatus = require('http-status');

const User = require('../models/users');
const { getObjectOrRaise404 } = require('../core/utils');

const get = async (req, res, next) => {
  try {
    const obj = await getObjectOrRaise404(User, req.params.userId);
    return res.send(obj);
  } catch (err) {
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const obj = await User.create({ ...req.body });
    return res.status(httpStatus.CREATED).send(obj);
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const objects = await User.find({});
    return res.send(objects);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const obj = await getObjectOrRaise404(User, req.user._id);
    obj.set(req.body);
    await obj.save();
    return res.send(obj);
  } catch (err) {
    return next(err);
  }
};

const updateInfo = async (req, res, next) => {
  req.body = { name: req.body.name, about: req.body.about };
  await update(req, res, next);
};

const updateAvatar = async (req, res, next) => {
  req.body = { avatar: req.body.avatar };
  await update(req, res, next);
};

module.exports = {
  get,
  create,
  list,
  updateInfo,
  updateAvatar,
};
