const express = require('express');

const { PageNotFound } = require('../core/errors');
const auth = require('../middleware/auth');

const router = express.Router();

router.use('/', require('./auth'));
router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use((req, res, next) => next(new PageNotFound()));

module.exports = router;
