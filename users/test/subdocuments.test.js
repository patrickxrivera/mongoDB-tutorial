const chai = require('chai');
const User = require('../src/users');

const expect = chai.expect;

describe('SUBDOCUMENTS', () => {
  it('can save subdocuments', async () => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Post' }]
    });
    await joe.save();
    const user = await User.findOne({ name: 'Joe' });

    expect(user.posts[0].title).to.equal('New Post');
  });

  it('can add subdocuments to existing record', async () => {
    let user = new User({
      name: 'Joe',
      posts: []
    });

    await user.save();

    user = await User.findOne({ name: 'Joe' });
    user.posts.push({ title: 'New Post' });
    await user.save();

    user = await User.findOne({ name: 'Joe' });

    expect(user.posts[0].title).to.equal('New Post');
  });
});
