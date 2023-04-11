require('dotenv').config();
const express = require('express');
const router = require('./routes/index');
const connectToDB = require('./core/db');
const errorHandler = require('./core/middleware');

const app = express();
const { PORT = 3000, MONGO_DNS = 'mongodb://localhost:27017' } = process.env;
const dummyAuth = (req, res, next) => {
  req.user = { _id: '643477e0a1aaf658689400d5' };
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dummyAuth);
app.use(router);
app.use(errorHandler);

app.listen(PORT, async () => {
  await connectToDB(MONGO_DNS);
});
