const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');

router.post('/', async (req, res) => {
    // check the session
    try {
    const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        blog_id: req.body.blog_id,
        // use the id from the session
        user_id: req.session.user_id,
      });

      res.status(200).json(newComment);
    } catch (err) {
    res.status(400).json(err);
    };
});

module.exports = router;
