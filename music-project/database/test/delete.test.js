const chai = require('chai');
const Artist = require('../models/artist');
const DeleteArtist = require('../queries/DeleteArtist');

const expect = chai.expect;

describe('DELETE', () => {
  it('should delete an artist by id', async () => {
    const youngThug = new Artist({ name: 'Young Thug' });
    await youngThug.save();

    await DeleteArtist(youngThug._id);
    const result = await Artist.findById({ _id: youngThug._id });

    expect(result).to.be.null;
  });
});
