const express = require('express');

const Post = require('../models/post');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/posts/:postId/comments', function (req, res) {
    const comment = new Comment(req.body);
    comment.author = req.user._id;

    comment
        .save()
        .then(() => {
            return Post.findById(req.user._id);
        })
        .then((post) => {
            console.log('POSTS', post);
            post.comments.unshift(comment);
            return post.save();
        })
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
