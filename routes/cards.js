const express = require('express');
const router = express.Router();

const cardController = require('../controllers/cards');


router.get('/', cardController.list);
router.post('/', cardController.createCard);
router.delete(`/:${cardController.idUrlKwarg}`, cardController.delete);
router.put(`/:${cardController.idUrlKwarg}/likes`, cardController.like);
router.delete(`/:${cardController.idUrlKwarg}/likes`, cardController.dislike);

module.exports = router;
