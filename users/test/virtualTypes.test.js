const chai = require('chai');
const User = require('../src/users');

const expect = chai.expect;

describe('VIRTUAL TYPES', () => {
  it('postCount returns the number of posts', async () => {
    let joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Post' }]
    });

    await joe.save();

    joe = await User.findOne({ name: 'Joe' });

    expect(joe.postCount).to.equal(1);
  });
});
