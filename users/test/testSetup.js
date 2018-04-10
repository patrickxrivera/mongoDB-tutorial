const mongoose = require('mongoose');

const initTestSetup = () => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection.on('error', (err) => console.warn(`Warning: ${err}`));

  beforeEach((done) => {
    mongoose.connection.collection('users').drop(() => {
      done();
    });
  });
};

module.exports = initTestSetup;
