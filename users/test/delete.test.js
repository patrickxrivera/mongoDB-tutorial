const User = require('../src/users');
const chai = require('chai');

const expect = chai.expect;

describe('DELETE', () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: 'Joe' });
    await joe.save();
  });

  it('instance remove', async () => {
    await joe.remove();
    const result = await User.findOne({ name: 'Joe' });

    expect(result).to.be.null;
  });
});
