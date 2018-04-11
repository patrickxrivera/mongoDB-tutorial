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

  it('can remove a subdocument from an existing record', async () => {
    let user = new User({
      name: 'Joe',
      posts: [{ title: 'New Post' }]
    });

    await user.save();

    user = await User.findOne({ name: 'Joe' });
    const post = user.posts[0];
    post.remove();
    await user.save();

    user = await User.findOne({ name: 'Joe' });

    expect(user.posts).to.have.length(0);
  });
});
