const chai = require('chai');
const Artist = require('../models/artist');
const EditArtist = require('../queries/EditArtist');

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
});
