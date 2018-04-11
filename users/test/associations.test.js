const chai = require('chai');
const User = require('../src/users');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

const expect = chai.expect;

describe('VALIDATION', () => {
  let joe, comment, blogPost;

  beforeEach(async () => {
    joe = new User({ name: 'Joe' });
    comment = new Comment({ content: 'This is fun' });
    blogPost = new BlogPost({ title: 'New Post', content: 'Hey there' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    await Promise.all([joe.save(), blogPost.save(), comment.save()]);
  });

  it('associates a blog post with a user', async () => {
    joe = await User.findOne({ name: 'Joe' }).populate('blogPosts');

    expect(joe.blogPosts[0].title).to.equal('New Post');
  });

  it('it connects the full association graph', async () => {
    const result = await User.findOne({ name: 'Joe' }).populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'user',
          model: 'user'
        }
      }
    });

    expect(result.name).to.equal('Joe');
    expect(result.blogPosts[0].title).to.equal('New Post');
    expect(result.blogPosts[0].comments[0].content).to.equal('This is fun');
    expect(result.blogPosts[0].comments[0].user.name).to.equal('Joe');
  });
});
