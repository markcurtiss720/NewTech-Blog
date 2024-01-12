const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll();

        const blogs = blogData.map((project) => project.get({ plain: true }));

        res.render('homepage', { blogs });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;


