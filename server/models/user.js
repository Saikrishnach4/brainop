const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  termsAccepted: {
    type: Boolean,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
