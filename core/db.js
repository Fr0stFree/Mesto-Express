const mongoose = require('mongoose');

const connectToDB = async (MONGO_DNS) => {
  await mongoose.connect(MONGO_DNS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDB;
