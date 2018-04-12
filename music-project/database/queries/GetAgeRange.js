const Artist = require('../models/artist');
const helper = require('../utils/helpers');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */

const getAgeRange = helper.getRange('age');

const getMinAge = getAgeRange('age');
const getMaxAge = getAgeRange('-age');

module.exports = () =>
  Promise.all([getMinAge(), getMaxAge()]).then((result) => ({
    min: result[0],
    max: result[1]
  }));
