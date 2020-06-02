const express = require('express');

const Post = require('../models/post');

const router = express.Router();

// GET
router.get('/posts/new', (_, res) => {
    res.render('posts-new', {});
});

// POST
router.post('/posts/new', async (req, res) => {
    // Create a new post
    const post = new Post(req.body);

    try {
        // Save post
        await post.save(() => {
            return res.redirect(`/`);
        });
    } catch (err) {
        throw new Error('Error in routes/posts.js', err);
    }
});

module.exports = router;
