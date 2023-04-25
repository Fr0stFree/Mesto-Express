const express = require('express');
const { celebrate } = require('celebrate');

const auth = require('../middleware/auth');
const {
  create,
  list,
  remove,
  like,
  dislike,
} = require('../controllers/cards');
const {
  postSchema,
} = require('../schemas/cards');

const router = express.Router();

router.get('/', list);
router.post('/', auth, celebrate(postSchema), create);
router.delete('/:cardId', auth, remove);
router.put('/:cardId/likes', auth, like);
router.delete('/:cardId/likes', auth, dislike);

module.exports = router;
