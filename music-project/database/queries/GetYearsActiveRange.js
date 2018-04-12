const Artist = require('../models/artist');
const helper = require('../utils/helpers');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */

const getYearsActiveRange = helper.getRange('yearsActive');

const getMinYearsActive = getYearsActiveRange('yearsActive');
const getMaxYearsActive = getYearsActiveRange('-yearsActive');

module.exports = () => {
  return Promise.all([getMinYearsActive(), getMaxYearsActive()]).then(
    (result) => ({ min: result[0], max: result[1] })
  );
};
