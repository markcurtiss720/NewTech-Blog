const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const createBlogRoutes = require('./createBlogRoutes');


router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/create', createBlogRoutes);

module.exports = router;