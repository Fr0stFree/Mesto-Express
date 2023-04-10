const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');


router.get('/:id', userController.get);
router.get('/', userController.list);
router.patch('/me', (req, res) => {
  delete req.body.avatar;
  return userController.update(req, res);
});
router.patch('/me/avatar', (req, res) => {
  delete req.body.name;
  delete req.body.about;
  return userController.update(req, res);
});
router.post('/', userController.create);

module.exports = router;
