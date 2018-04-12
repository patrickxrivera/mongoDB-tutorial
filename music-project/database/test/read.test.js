const chai = require('chai');
const Artist = require('../models/artist');
const FindArtist = require('../queries/FindArtist');
const GetAgeRange = require('../queries/GetAgeRange');
const GetYearsActiveRange = require('../queries/GetYearsActiveRange');
const SearchArtists = require('../queries/SearchArtists');
const initTestSetup = require('./testSetup');

const expect = chai.expect;

initTestSetup();

describe('READ', () => {
  it('should find an artist by id', async () => {
    const youngThug = new Artist({ name: 'Young Thug' });
    await youngThug.save();

    const result = await FindArtist(youngThug._id);

    expect(result.name).to.equal('Young Thug');
  });

  it('should get the age range for all artists', async () => {
    const joe = new Artist({ name: 'Joe', age: 23 });
    const sam = new Artist({ name: 'sam', age: 27 });
    const beth = new Artist({ name: 'Beth', age: 17 });

    await Promise.all([joe.save(), sam.save(), beth.save()]);

    const result = await GetAgeRange();

    expect(result.min).to.equal(17);
    expect(result.max).to.equal(27);
  });

  it('should get the years active range for all artists', async () => {
    const joe = new Artist({ name: 'Joe', yearsActive: 2 });
    const sam = new Artist({ name: 'sam', yearsActive: 9 });
    const beth = new Artist({ name: 'Beth', yearsActive: 6 });

    await Promise.all([joe.save(), sam.save(), beth.save()]);

    const result = await GetYearsActiveRange();

    expect(result.min).to.equal(2);
    expect(result.max).to.equal(9);
  });

  xit('should return an array of artists for the given criteria', async () => {
    const joe = new Artist({ name: 'Joe', age: 23, yearsActive: 3 });
    const sam = new Artist({ name: 'Sam', age: 27, yearsActive: 9 });
    const beth = new Artist({ name: 'Beth', age: 17, yearsActive: 2 });
    const mike = new Artist({ name: 'Mike', age: 31, yearsActive: 7 });
    const becky = new Artist({ name: 'Becky', age: 54, yearsActive: 5 });

    await Promise.all([
      joe.save(),
      sam.save(),
      beth.save(),
      mike.save(),
      becky.save()
    ]);

    const criteria = {
      name: 'Joe',
      yearsActive: {
        min: 2,
        max: 4
      }
    };

    const args = {
      criteria,
      sortProperty: 'age',
      offset: 0,
      limit: 3
    };

    const result = await SearchArtists(args);

    expect(result.artists).to.have.length(1);
    expect(result.count).to.equal(5);
    expect(result.offset).to.equal(0);
    expect(result.limit).to.equal(3);
  });
});
