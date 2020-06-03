const express = require('express');

const Post = require('../models/post');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/posts/:postId/comments', function (req, res) {
    const comment = new Comment(req.body);

    comment
        .save()
        .then((comment) => {
            return Post.findById(req.params.postId);
        })
        .then((post) => {
            post.comments.unshift(comment);
            return post.save();
        })
        .then((post) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
