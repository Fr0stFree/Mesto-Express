const mongoose = require('mongoose');

async function connectToDB(MONGO_DNS) {
  await mongoose.connect(MONGO_DNS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectToDB;
