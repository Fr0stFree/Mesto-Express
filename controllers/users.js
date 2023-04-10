const User = require('../models/users');


class UserController {
  get = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.send({status: "OK", data: user});
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({status: "FAIL", message: `Пользователь с id ${req.params.id} не найден`});
      }
      res.status(500).send({status: "FAIL", message: `Произошла ошибка: ${err.message}`});
    }
  }

  create = async (req, res, next) => {
    const {name, about, avatar} = req.body;
    try {
      const user = await User.create({name, about, avatar});
      res.status(201).send({status: "OK", data: user});
    } catch (err) {
      if (err['_message'] === 'user validation failed') {
        return res.status(400).send({status: "FAIL", message: "Не все поля заполнены."});
      }
      res.status(500).send({status: "FAIL", message: `Произошла ошибка: ${err.message}`});
    }
  }

  list = async (req, res, next) => {
    try {
      const users = await User.find({})
      res.send({status: "OK", data: users});
    } catch (err) {
      res.status(500).send({status: "FAIL", message: `Произошла ошибка: ${err.message}`});
    }
  }

  update = async (req, res, next) => {
    const { name, about, avatar } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name, about, avatar },
        {new: true, runValidators: true}
      );
      res.send({status: "OK", data: user});
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          status: "FAIL",
          message: `Пользователь с id ${req.params.id} не найден`
        });
      }
      res.status(500).send({status: "FAIL", message: `Произошла ошибка: ${err.message}`});
    }
  }
}

const userController = new UserController();
module.exports = userController;