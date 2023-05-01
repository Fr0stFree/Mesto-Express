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
  createSchema,
  getOneSchema,
} = require('../schemas/cards');

const router = express.Router();

router.get('/', auth, list);
router.post('/', auth, celebrate(createSchema), create);
router.delete('/:cardId', celebrate(getOneSchema), auth, remove);
router.put('/:cardId/likes', celebrate(getOneSchema), auth, like);
router.delete('/:cardId/likes', celebrate(getOneSchema), auth, dislike);

module.exports = router;
