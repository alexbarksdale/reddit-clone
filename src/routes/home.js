const express = require('express');

const Post = require('../models/post');

const router = express.Router();

// GET
router.get('/', (req, res) => {
    const currentUser = req.user;
    // res.render('home', {});
    console.log(req.cookies);
    Post.find()
        .populate('author')
        .then((posts) => {
            res.render('posts-index', { posts, currentUser });
            // res.render('home', {});
        })
        .catch((err) => {
            console.log(err.message);
        });
});

module.exports = router;
