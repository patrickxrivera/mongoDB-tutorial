const mongoose = require('mongoose');

const initTestSetup = () => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection.on('error', (err) => console.warn(`Warning: ${err}`));

  beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;

    users.drop(() => {
      comments.drop(() => {
        blogposts.drop(() => {
          done();
        });
      });
    });
  });
};

module.exports = initTestSetup;
