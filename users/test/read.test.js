const User = require('../src/users');
const chai = require('chai');

const expect = chai.expect;

const getID = (data) => data._id.toString();

describe('READ', () => {
  let alex, joe, maria, zach;

  beforeEach(async () => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

    await Promise.all([alex.save(), joe.save(), maria.save(), zach.save()]);
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

  it('should skip and limit users', async () => {
    const users = await User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2);

    expect(users).to.have.length(2);
    expect(users[0].name).to.equal('Joe');
    expect(users[1].name).to.equal('Maria');
  });
});
