const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  postCount: Number
});

// this ensures the test doesn't recreate the model in --watch mode
const User = mongoose.models.user || mongoose.model('user', UserSchema);

module.exports = User;
