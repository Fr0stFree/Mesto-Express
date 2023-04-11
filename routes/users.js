const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');


router.get(`/:${userController.idUrlKwarg}`, userController.get);
router.post('/', userController.create);
router.get('/', userController.list);
router.patch('/me', userController.updateInfo);
router.patch('/me/avatar', userController.updateAvatar);

module.exports = router;
