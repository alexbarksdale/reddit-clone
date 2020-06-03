const express = require('express');

const Post = require('../models/post');

const router = express.Router();

// ==== GET ====
router.get('/posts/new', (_, res) => {
    res.render('posts-new', {});
});

router.get('/posts/:id', function (req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id)
        .populate('comments')
        .then((post) => {
            res.render('posts-show', { post });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

router.get('/n/:subreddit', function (req, res) {
    Post.find({ subreddit: req.params.subreddit })
        .then((posts) => {
            res.render('posts-index', { posts });
        })
        .catch((err) => {
            console.log(err);
        });
});

// ==== POST ====
router.post('/posts/new', async (req, res) => {
    if (req.user) {
        const post = new Post(req.body);

        post.save(function () {
            return res.redirect('/');
        });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
});

module.exports = router;
