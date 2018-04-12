const Artist = require('../models/artist');

const getRange = (prop) => (sortBy) => () =>
  Artist.find({})
    .sort(sortBy)
    .limit(1)
    .then((artist) => artist[0][prop]);

module.exports = {
  getRange
};
