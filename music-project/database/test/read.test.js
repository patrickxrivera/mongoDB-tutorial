const chai = require('chai');
const Artist = require('../models/artist');
const FindArtist = require('../queries/FindArtist');
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
});
