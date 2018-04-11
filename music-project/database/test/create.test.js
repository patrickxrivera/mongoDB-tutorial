const chai = require('chai');
const Artist = require('../models/artist');
const CreateArtist = require('../queries/CreateArtist');
const initTestSetup = require('./testSetup');

const expect = chai.expect;

initTestSetup();

describe('CREATE', () => {
  it('should create an artist with the given props', async () => {
    const props = {
      name: 'Young Thug',
      age: 21,
      yearsActive: 4,
      genre: 'Rap'
    };

    const youngThug = await CreateArtist(props);

    expect(youngThug.isNew).to.be.false;
  });
});
