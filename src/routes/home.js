const express = require('express');

const Post = require('../models/post');

const router = express.Router();

// ==== GET ====
router.get('/', (req, res) => {
    const currentUser = req.user;

    Post.find({})
        .then((posts) => {
            res.render('posts-index', { posts, currentUser });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

module.exports = router;
