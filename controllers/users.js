const BaseController = require('./base');
const User = require('../models/users');

class UserController extends BaseController {
  updateInfo = async (req, res) => {
    req.idUrlKwarg = req.user._id;
    req.body = { name: req.body.name, about: req.body.about };
    await this.update(req, res);
  };

  updateAvatar = async (req, res) => {
    req.idUrlKwarg = req.user._id;
    req.body = { avatar: req.body.avatar };
    await this.update(req, res);
  };
}

const userController = new UserController(User, 'userId');
module.exports = userController;
