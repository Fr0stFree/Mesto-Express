const mongoose = require('mongoose');

const connectToMongo = async (MONGO_DNS) => {
  await mongoose.connect(MONGO_DNS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectToMongo };
