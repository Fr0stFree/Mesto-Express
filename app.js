require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');

const settings = require('./core/settings');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');
const { connectToMongo } = require('./core/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(settings.SERVER_PORT, async () => {
  await connectToMongo(settings.MONGO_DNS || 'mongodb://localhost:27017/mestodb');
});
