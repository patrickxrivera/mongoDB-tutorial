const User = require('../src/users');
const chai = require('chai');

const expect = chai.expect;

const getID = (data) => data._id.toString();

describe('READ', () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: 'Joe' });
    await joe.save();
  });

  it('reads a user from the db', async () => {
    let result = await User.find({ name: 'Joe' });
    result = getID(result[0]);

    expect(result).to.equal(getID(joe));
  });

  it('finds a user in the db', async () => {
    let result = await User.findOne({ _id: joe._id });

    expect(result.name).to.equal('Joe');
  });
});
