const express = require('express');

const {
  create,
  list,
  remove,
  like,
  dislike,
} = require('../controllers/cards');

const router = express.Router();

router.get('/', list);
router.post('/', create);
router.delete('/:cardId', remove);
router.put('/:cardId/likes', like);
router.delete('/:cardId/likes', dislike);

module.exports = router;
