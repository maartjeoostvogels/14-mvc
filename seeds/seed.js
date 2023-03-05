const sequelize = require('../config/connection');
const { User, Blog, Comment} = require('../models');

const userData = require('./userData.json');
const blogData = require('./BlogData.json');
const userComments = require('./userComments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of userComments) {
    await Comment.create({
      ...comment,
      blog_id: Math.floor(Math.random() * blogData.length) + 1,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
