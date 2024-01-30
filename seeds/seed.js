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

    // for(const blog of blogData) {
    //     const correspondingUser = users.find((user) => user.id === blog.user_id);
    //     if(correspondingUser) {
    //         await Blog.create({
    //             ...blog,
    //             user_id: correspondingUser.id
    //         });
    //     } else {
    //         console.error(`User with id ${blog.user_id} not found with id ${blog.id}`)
    //     }
    // }

    process.exit(0);
};

seedDatabase();