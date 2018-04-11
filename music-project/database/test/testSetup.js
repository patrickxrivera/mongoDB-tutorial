const mongoose = require('mongoose');

const initTestSetup = () => {
  mongoose.connect('mongodb://localhost/upstar_music');
  mongoose.connection.on('error', (err) => console.warn(`Warning: ${err}`));

  beforeEach((done) => {
    const { artists } = mongoose.connection.collections;
    artists.drop(() => {
      done();
    });
  });
};

module.exports = initTestSetup;
