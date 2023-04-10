const Card = require('../models/cards');


class CardController {
  list = async (req, res, next) => {
    try {
      const card = await Card.find({});
      res.send({status: "OK", data: card});
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404)
                  .send({status: "FAIL", message: `Карточка с id ${req.params.id} не найдена`});
      }
      res.status(500).send({status: "FAIL", message: `Произошла ошибка: ${err.message}`});
    }
  }

  create = async (req, res, next) => {
    const { name, link } = req.body;
    try {
      const card = await Card.create({name, link, owner: req.user._id});
      res.status(201).send({status: "OK", data: card});
    } catch (err) {
      if (err['_message'] === 'user validation failed') {
        return res.status(400).send({status: "FAIL", message: "Не все поля заполнены."});
      }
      res.status(500).send({status: "FAIL", message: `Произошла ошибка: ${err.message}`});
    }
  }

  toggleLike = async (req, res, next) => {
    let card = null;
    try {
      if (req.method === 'PUT') {
        card = await Card.findByIdAndUpdate(
          req.params.cardId,
          {$addToSet: {likes: req.user._id}},
          {new: true}
        );
      } else {
        card = await Card.findByIdAndUpdate(
          req.params.cardId,
          {$pull: {likes: req.user._id}},
          {new: true}
        );
      }
      res.status(200).send({status: "OK", data: card});
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404)
                  .send({status: "FAIL", message: `Карточка с id ${req.params.id} не найдена`});
      }
      res.status(500).send({status: "FAIL", message: `Произошла ошибка: ${err.message}`});
    }
  }

  delete = async (req, res, next) => {
    try {
      await Card.findByIdAndRemove(req.params.id);
      res.status(204).send({status: "OK"});
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404)
                  .send({status: "FAIL", message: `Карточка с id ${req.params.id} не найдена`});
      }
      res.status(500).send({status: "FAIL", message: `Произошла ошибка: ${err.message}`});
    }
  }
}

const cardController = new CardController();
module.exports = cardController;