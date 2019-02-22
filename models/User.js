var mongoose = require('mongoose');

var UserModel = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  }
});

module.exports.UserModel = {UserModel};
