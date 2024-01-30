const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'article',
                'created_at',
            ],
            include: [
                {
                    model: User,
                    attributes: [
                        'name', 
                        'email',
                    ],
                    exclude: [
                        'password',
                    ],
                },
            ],
        });

            const blogs = blogData.map((blog) => blog.get({ plain: true }));

            res.render('dashboard', {
                blogs,
                logged_in: true
            });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/view/:id', withAuth, async (req, res) => {

    try {
        const dbBlogData = await Blog.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'article',
            ],
        });

        const blog = dbBlogData.get({ plain: trie})
        res.render('view-blogs',
        {
            blog,
            logged_in: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err); 
    }
});



router.get('/create', withAuth, async (req, res) => {
    res.render('create-blog', {
        logged_in: true,
    });
});

module.exports = router;