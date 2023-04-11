const { ObjectDoesNotExist } = require('../utils/errors');

module.exports = class BaseController {
  constructor(model, idUrlKwarg) {
    this.model = model;
    this.idUrlKwarg = idUrlKwarg || 'id';
  };

  get = async (req, res) => {
    const id_kwarg = this.getIdUrlKwarg(req);
    try {
      const obj = await this.getObjOrRaiseError({_id: id_kwarg});
      res.send(obj);
    } catch (err) {
      if (err instanceof ObjectDoesNotExist) {
        return res.status(404).send({message: `Объект с id ${id_kwarg} не найден`});
      }
      res.status(500).send({message: `Произошла ошибка: ${err.message}`});
    }
  };

  create = async (req, res) => {
    const validationErrors = new this.model({...req.body}).validateSync();
    if (validationErrors) {
      return res.status(400).send({message: {...validationErrors.errors}});
    }
    try {
      const obj = await this.model.create({...req.body});
      res.status(201).send(obj);
    } catch (err) {
      res.status(500).send({message: `Произошла ошибка: ${err.message}`});
    }
  };

  list = async (req, res) => {
    try {
      const objects = await this.model.find({})
      res.send(objects);
    } catch (err) {
      res.status(500).send({message: `Произошла ошибка: ${err.message}`});
    }
  };

  update = async (req, res) => {
    const id_kwarg = this.getIdUrlKwarg(req);
    try {
      const obj = await this.getObjOrRaiseError({_id: id_kwarg});
      obj.set({...req.body});
      await obj.save();
      res.send(obj);
    } catch (err) {
      if (err instanceof ObjectDoesNotExist) {
        return res.status(404).send({message: `Объект с id ${id_kwarg} не найден`});
      }
      res.status(500).send({message: `Произошла ошибка: ${err.message}`});
    }
  };

  delete = async (req, res) => {
    const id_kwarg = this.getIdUrlKwarg(req);
    try {
      const obj = await this.getObjOrRaiseError({_id: id_kwarg});
      await obj.deleteOne()
      res.status(204).send({message: 'Объект успешно удален'});
    } catch (err) {
      if (err instanceof ObjectDoesNotExist) {
        return res.status(404).send({message: `Объект с id ${req.id_url_kwarg} не найден`});
      }
      res.status(500).send({message: `Произошла ошибка: ${err.message}`});
    }
  };

  getIdUrlKwarg = (req) => {
    return req.id_url_kwarg || req.params[this.idUrlKwarg];
  }

  getObjOrRaiseError = async ({...params}) => {
    const obj = await this.model.findOne({...params});
    if (!obj) {
      throw new ObjectDoesNotExist('Объект не найден');
    }
    return obj;
  };
}
