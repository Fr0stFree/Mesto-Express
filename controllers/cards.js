const httpStatus = require('http-status');

const Card = require('../models/cards');
const { getObjectOrRaise404 } = require('../core/utils');

const create = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const card = await Card.create({ ...req.body });
    return res.status(httpStatus.CREATED).send(card);
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const obj = await getObjectOrRaise404(Card, req.params.cardId);
    await obj.deleteOne();
    return res.send({ message: 'Объект успешно удален' });
  } catch (err) {
    return next(err);
  }
};

const toggleLike = async (req, res, next, callback) => {
  try {
    const card = await getObjectOrRaise404(Card, req.params.cardId);
    callback(card);
    await card.save();
    const updatedCard = await Card.findById(card._id).populate('owner').populate('likes');
    return res.send(updatedCard);
  } catch (err) {
    return next(err);
  }
};

const like = async (req, res, next) => {
  await toggleLike(req, res, next, (card) => card.likes.addToSet(req.user._id));
};

const dislike = async (req, res, next) => {
  await toggleLike(req, res, next, (card) => card.likes.pull(req.user._id));
};

module.exports = {
  create,
  list,
  remove,
  like,
  dislike,
};
