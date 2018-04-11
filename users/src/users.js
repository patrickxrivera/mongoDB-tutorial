const mongoose = require('mongoose');
const PostSchema = require('./post');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

// this ensures the test doesn't recreate the model in --watch mode
const User = mongoose.models.user || mongoose.model('user', UserSchema);

module.exports = User;
