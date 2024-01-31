const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');


router.post('/', withAuth, async (req, res) => {
    try{
        const newBlog = await Blog.create({
            title: req.body.title,
            article: req.body.article,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).json(err);
    };
});


router.put('/:id', withAuth, (req, res) => {
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

router.delete('/:id', withAuth, (req, res) => {
    try{
        const deleteBlog = Blog.destroy({
            where: {
                id: req.params.id,
            },
        });

        if(!deleteBlog) {
            res.status(400).json({ message: 'No Blog found with this ID' });
        };
        res.status(200).json({ message: "Blog deleted successfully!" });
    } catch (err) {
        res.status(500).json(err);
    };
});



module.exports = router;