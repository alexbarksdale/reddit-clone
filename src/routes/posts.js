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
        .then((post) => {
            res.render('posts-show', { post });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

// ==== POST ====
router.post('/posts/new', async (req, res) => {
    // Create a new post
    const post = new Post(req.body);

    try {
        // Save post
        await post.save(() => res.redirect('/'));
    } catch (err) {
        throw new Error('Error in routes/posts.js', err);
    }
});

module.exports = router;
