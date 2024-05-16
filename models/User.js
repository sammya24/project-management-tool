// models/User.js
const mongoose = require('mongoose');

let User;

try {
  User = mongoose.model('User');
} catch (e) {

  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  User = mongoose.model('User', userSchema);
}

module.exports = User;