const express = require('express');
const { celebrate } = require('celebrate');

const auth = require('../middleware/auth');
const {
  get,
  create,
  login,
  list,
  updateInfo,
  updateAvatar,
} = require('../controllers/users');
const {
  registerSchema,
  loginSchema,
  getOneSchema,
  updateInfoSchema,
  updateAvatarSchema,
} = require('../schemas/users');

const router = express.Router();

router.post('/signup', celebrate(registerSchema), create);
router.post('/signin', celebrate(loginSchema), login);
router.get('/:userId', auth, celebrate(getOneSchema), get);
router.get('/', auth, list);
router.patch('/me', auth, celebrate(updateInfoSchema), updateInfo);
router.patch('/me/avatar', auth, celebrate(updateAvatarSchema), updateAvatar);

module.exports = router;
