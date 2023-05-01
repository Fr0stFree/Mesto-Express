const mongoose = require('mongoose');
require('mongoose-type-email');
const bcrypt = require('bcryptjs');

const ObjectDoesNotExist = require('../core/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.Email,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

// eslint-disable-next-line func-names
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new ObjectDoesNotExist('Incorrect email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ObjectDoesNotExist('Incorrect email or password');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
