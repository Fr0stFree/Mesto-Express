require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');


const app = express();
const { PORT = 3000, MONGO_DNS = 'mongodb://localhost:27017' } = process.env;
const dummyAuth = (req, res, next) => {
  req.user = {
    _id: '643532afbbc0d5249985f540',
  };
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

app.listen(PORT, () => {
  console.log(`"Server listening port ${PORT}`)
})
