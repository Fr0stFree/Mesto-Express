const express = require('express');
const httpStatus = require('http-status');

const auth = require('../middleware/auth');

const router = express.Router();

router.use('/', require('./auth'));
router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use((req, res) => res.status(httpStatus.NOT_FOUND).send({ message: 'Уходи' }));

module.exports = router;
