const httpStatus = require('http-status');

const { ObjectDoesNotExist } = require('../utils/errors');

module.exports = class BaseController {
  constructor(Model, idUrlKwarg) {
    this.Model = Model;
    this.idUrlKwarg = idUrlKwarg || 'id';
  }

  get = async (req, res) => {
    const idUrlKwarg = this.getIdUrlKwarg(req);
    try {
      const obj = await this.getObjOrRaiseError({ _id: idUrlKwarg });
      res.send(obj);
    } catch (err) {
      if (err instanceof ObjectDoesNotExist) {
        return res.status(httpStatus.NOT_FOUND)
          .send({ message: `Объект с id ${idUrlKwarg} не найден` });
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: `Произошла ошибка: ${err.message}` });
    }
    return null;
  };

  create = async (req, res) => {
    const validationErrors = new this.Model({ ...req.body }).validateSync();
    if (validationErrors) {
      return res.status(httpStatus.BAD_REQUEST)
        .send({ message: { ...validationErrors.errors } });
    }
    try {
      const obj = await this.Model.create({ ...req.body });
      res.status(httpStatus.CREATED)
        .send(obj);
    } catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: `Произошла ошибка: ${err.message}` });
    }
    return null;
  };

  list = async (req, res) => {
    try {
      const objects = await this.Model.find({});
      res.send(objects);
    } catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: `Произошла ошибка: ${err.message}` });
    }
  };

  update = async (req, res) => {
    const idUrlKwarg = this.getIdUrlKwarg(req);
    try {
      const obj = await this.getObjOrRaiseError({ _id: idUrlKwarg });
      obj.set({ ...req.body });
      await obj.save();
      res.send(obj);
    } catch (err) {
      if (err instanceof ObjectDoesNotExist) {
        return res.status(httpStatus.NOT_FOUND)
          .send({ message: `Объект с id ${idUrlKwarg} не найден` });
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: `Произошла ошибка: ${err.message}` });
    }
    return null;
  };

  delete = async (req, res) => {
    const idUrlKwarg = this.getIdUrlKwarg(req);
    try {
      const obj = await this.getObjOrRaiseError({ _id: idUrlKwarg });
      await obj.deleteOne();
      res.status(httpStatus.CREATED)
        .send({ message: 'Объект успешно удален' });
    } catch (err) {
      if (err instanceof ObjectDoesNotExist) {
        return res.status(httpStatus.NOT_FOUND)
          .send({ message: `Объект с id ${idUrlKwarg} не найден` });
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: `Произошла ошибка: ${err.message}` });
    }
    return null;
  };

  getIdUrlKwarg = (req) => req.idUrlKwarg || req.params[this.idUrlKwarg];

  getObjOrRaiseError = async ({ ...params }) => {
    const obj = await this.Model.findOne({ ...params });
    if (!obj) {
      throw new ObjectDoesNotExist('Объект не найден');
    }
    return obj;
  };
};
