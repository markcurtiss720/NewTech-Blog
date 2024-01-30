const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
    try{
        const newBlog = await Blog.create({
            title: req.body.title,
            article: req.body.article,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    };
});


router.put('/', async (req, res) => {
   try {
    const dbBlogData = Blog.update({
        title: req.body.title,
        article: req.body.article,
    },
    {
        where: {
            id: req.params.id
        }
    });

    if(!dbBlogData) {
        res.status(400).json({ message: 'No Blog found with this ID' });
    };

    res.status(200).json(dbBlogData);
   } catch (err) {
    res.status(400).json(err);
   };
})



module.exports = router;