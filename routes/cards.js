const express = require('express');
const router = express.Router();

const cardController = require('../controllers/cards');


router.get('/', cardController.list);
router.post('/', cardController.create);
router.delete('/:id', cardController.delete);
router.put('/:cardId/likes', cardController.toggleLike);
router.delete('/:cardId/likes', cardController.toggleLike);

module.exports = router;