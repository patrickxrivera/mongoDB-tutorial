const mongoose = require('mongoose');

const initTestSetup = () => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection.on('error', (err) => console.warn(`Warning: ${err}`));

  beforeEach((done) => {
    // TODO: figure out a much better way to handle this
    mongoose.connection.collection('users').drop(() => {
      mongoose.connection.collection('comments').drop(() => {
        mongoose.connection.collection('blogPost').drop(() => {
          done();
        });
      });
    });
  });
};

module.exports = initTestSetup;
