const User = require('../src/users');
const chai = require('chai');

const expect = chai.expect;

describe('UPDATE', () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: 'Joe', postCount: 7 });
    await joe.save();
  });

  const assertUpdate = async () => {
    const users = await User.find({});

    expect(users.length).to.equal(1);
    expect(users[0].name).to.equal('Alex');
  };

  it('instance type using set and save', async () => {
    await joe.set('name', 'Alex');
    await joe.save();
    await assertUpdate();
  });

  it('model instance update', async () => {
    await joe.update({ name: 'Alex' });
    assertUpdate();
  });

  it('class based update', async () => {
    await User.update({ name: 'Joe' }, { name: 'Alex' });
    assertUpdate();
  });

  it('class based update', async () => {
    await User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' });
    assertUpdate();
  });

  it('class based update', async () => {
    await User.findByIdAndUpdate({ _id: joe._id }, { name: 'Alex' });
    assertUpdate();
  });

  it('increments the postCount for a user', async () => {
    await User.update({ name: 'Joe' }, { $inc: { postCount: 1 } });
    const user = await User.findOne({ name: 'Joe' });

    expect(user.postCount).to.equal(8);
  });
});
