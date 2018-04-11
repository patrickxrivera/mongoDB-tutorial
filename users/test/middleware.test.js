const chai = require('chai');
const User = require('../src/users');
const BlogPost = require('../src/blogPost');

const expect = chai.expect;

describe('MIDDLEWARE', () => {
  let joe, blogPost;

  beforeEach(async () => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'New Post', content: 'Hey there' });

    joe.blogPosts.push(blogPost);

    await Promise.all([joe.save(), blogPost.save()]);
  });

  it('removes blog posts associated w/ a removed user', async () => {
    await joe.remove();

    const count = await BlogPost.count();

    expect(count).to.equal(0);
  });
});
