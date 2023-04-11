const httpStatus = require('http-status');

const Card = require('../models/cards');
const BaseController = require('./base');
const { ObjectDoesNotExist } = require('../utils/errors');

class CardController extends BaseController {
  createCard = async (req, res) => {
    req.body.owner = req.user._id;
    await this.create(req, res);
  };

  toggleLike = async (req, res, callback) => {
    const idUrlKwarg = this.getIdUrlKwarg(req);
    try {
      const card = await this.getObjOrRaiseError({ _id: idUrlKwarg });
      callback(card);
      await card.save();
      res.send(card);
    } catch (err) {
      if (err instanceof ObjectDoesNotExist) {
        return res.status(httpStatus.NOT_FOUND)
          .send({ message: `Карточка с id ${idUrlKwarg} не найдена` });
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: `Произошла ошибка: ${err.message}` });
    }
    return null;
  };

  like = async (req, res) => {
    await this.toggleLike(req, res, (card) => card.likes.addToSet(req.user._id));
  };

  dislike = async (req, res) => {
    await this.toggleLike(req, res, (card) => card.likes.pull(req.user._id));
  };
}

const cardController = new CardController(Card, 'cardId');
module.exports = cardController;
