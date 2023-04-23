const express = require('express');

const auth = require('../middleware/auth');
const {
  get,
  create,
  login,
  list,
  updateInfo,
  updateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.post('/signup', create);
router.post('/signin', login);
router.get('/:userId', auth, get);
router.get('/', auth, list);
router.patch('/me', auth, updateInfo);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
