require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const httpStatus = require('http-status');

const app = express();
const { PORT = 3000, MONGO_DNS = 'mongodb://localhost:27017' } = process.env;
const dummyAuth = (req, res, next) => {
  req.user = { _id: '64354f6f7387594efc5d6ffc' };
  next();
};

mongoose.connect(MONGO_DNS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(dummyAuth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).send({ message: 'Уходи' });
});

app.listen(PORT);
