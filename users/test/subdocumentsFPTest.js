// const R = require('ramda');

// const getPostTitle = (user) => {
//   console.log(user);
//   return user.posts[0].title;
// };
//
// const addPost = (user) => {
//   user.posts.push({ title: 'New Post' });
//   console.log(user);
//   return user;
// };
//
// const findUser = (user) => User.findOne({ name: 'Joe' });
//
// const saveUser = async (user) => {
//   try {
//     await user.save();
//     return user;
//   } catch (err) {
//     console.log(err);
//     return {};
//   }
// };

// const postTitle = R.pipeP(
//   saveUser,
//   findUser,
//   addPost,
//   saveUser,
//   findUser,
//   getPostTitle
// )(user);
