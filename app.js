require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const { dummyAuth } = require('./utils/middleware');


const { PORT = 3000, MONGO_DNS = 'mongodb://localhost:27017' } = process.env;
const app = express();

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

app.listen(PORT, () => {
  console.log(`"Server listening port ${PORT}`)
})
