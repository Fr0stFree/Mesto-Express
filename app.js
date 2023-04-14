require('dotenv').config();
const express = require('express');
const router = require('./routes/index');
const { connectToMongo } = require('./core/db');
const { errorHandler, OAuth2 } = require('./core/middleware');

const app = express();
const {
  PORT = 8000,
  MONGO_DNS = 'mongodb://localhost:27017',
} = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(OAuth2);
app.use(router);
app.use(errorHandler);

app.listen(PORT, async () => {
  await connectToMongo(MONGO_DNS);
});
