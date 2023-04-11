const express = require('express');
const {
  get,
  create,
  list,
  updateInfo,
  updateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/:userId', get);
router.post('/', create);
router.get('/', list);
router.patch('/me', updateInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
