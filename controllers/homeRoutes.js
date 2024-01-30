const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            attributes: [
                'id',
                'title',
                'created_at',
                'article',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blogs = blogData.map((project) => project.get({ plain: true }));

        res.render('homepage', { blogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/blogpost', async (req, res) => {
    try{
    const blogData = await Blog.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'article',
        ],
        include: [
            {
                model: User,
                attributes: ['name'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'blog_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['name']
                },
            },
        ],
    });
    res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});


//get one blogpost
router.get('/blogpost/:id', withAuth, async (req, res) => {
    try {
        const dbBlogData = await Blog.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'created_at',
                'article',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    },
                },
            ],
        });
        
        const userName = req.session.user_name;

        const blogs = dbBlogData.get({ plain: true });
        res.render('blogpost', { 
            blogs, 
            logged_in: req.session.logged_in, 
            userName,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

router.get('/signup', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup')
})

module.exports = router;


