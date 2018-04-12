const chai = require('chai');
const Artist = require('../models/artist');
const EditArtist = require('../queries/EditArtist');
const SetRetired = require('../queries/SetRetired');
const SetNotRetired = require('../queries/SetNotRetired');

const expect = chai.expect;

describe('UPATE', () => {
  it('should update an artist by id', async () => {
    const mario = new Artist({
      name: 'Mario',
      age: 22,
      yearsActive: 5,
      genre: 'Hip Hop'
    });

    await mario.save();

    const newProps = {
      name: 'Mario',
      age: 7,
      yearsActive: 2,
      genre: 'Rap'
    };

    await EditArtist(mario._id, newProps);

    const results = await Artist.findById(mario._id);

    expect(results.age).to.equal(7);
  });

  it('should update an artist to be retired', async () => {
    const joe = new Artist({ name: 'Joe', age: 23, retired: false });
    const sam = new Artist({ name: 'sam', age: 27, retired: false });
    const beth = new Artist({ name: 'Beth', age: 17, retired: false });

    await Promise.all([joe.save(), sam.save(), beth.save()]);

    const result = await SetRetired([joe._id, beth._id]);

    expect(result.n).to.equal(2);
  });

  it('should update an artist to be retired', async () => {
    const joe = new Artist({ name: 'Joe', age: 23, retired: false });
    const sam = new Artist({ name: 'sam', age: 27, retired: true });
    const beth = new Artist({ name: 'Beth', age: 17, retired: true });

    await Promise.all([joe.save(), sam.save(), beth.save()]);

    const result = await SetNotRetired([sam._id, beth._id]);

    expect(result.n).to.equal(2);
  });
});
