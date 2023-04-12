const express = require('express');
const httpStatus = require('http-status');

const router = express.Router();

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res) => res.status(httpStatus.NOT_FOUND).send({ message: 'Уходи' }));

module.exports = router;
