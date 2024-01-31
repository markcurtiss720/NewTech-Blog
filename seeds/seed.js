const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');

const blogData = require('./blogData.json');
const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    console.log('\n----- DATABASE SYNCED -----\n')

    await User.bulkCreate(userData);

    await Blog.bulkCreate(blogData);

    await Comment.bulkCreate(commentData);

    process.exit(0);
};

seedDatabase();