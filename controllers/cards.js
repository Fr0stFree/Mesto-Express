const httpStatus = require('http-status');

const Card = require('../models/cards');
const { getObjectOrRaise404 } = require('../core/utils');

const create = async (req, res, next) => {
  const { name, link, } = req.body;
  try {
    const card = await Card.create({name, link, owner: req.user._id});
    return await res.status(httpStatus.CREATED).send(card);
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const card = await getObjectOrRaise404(Card, req.params.cardId);
    await card.deleteOne();
    return res.send({ message: `'${card.name}' успешно удалена` });
  } catch (err) {
    return next(err);
  }
};

const toggleLike = async (req, res, next, callback) => {
  try {
    const card = await getObjectOrRaise404(Card, req.params.cardId);
    callback(card);
    await card.save();
    return res.send(await card.populate(['owner', 'likes']));
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
