const User = require('../src/users');
const chai = require('chai');

const expect = chai.expect;

describe('DELETE', () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: 'Joe' });
    await joe.save();
  });

  it('model instance remove', async () => {
    await joe.remove();
    const result = await User.findOne({ name: 'Joe' });

    expect(result).to.be.null;
  });

  it('class method remove', async () => {
    await User.remove({ name: 'Joe' });
    const result = await User.findOne({ name: 'Joe' });

    expect(result).to.be.null;
  });

  it('class method findOneAndRemove', async () => {
    await User.remove({ name: 'Joe' });
    const result = await User.findOneAndRemove({ name: 'Joe' });

    expect(result).to.be.null;
  });

  it('class method findByIdAndRemove', async () => {
    await User.remove({ _id: joe._id });
    const result = await User.findByIdAndRemove({ _id: joe._id });

    expect(result).to.be.null;
  });
});
