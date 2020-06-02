const express = require('express');

const Post = require('../models/post');

const router = express.Router();

router.get('/', (_, res) => {
    Post.find({})
        .then((posts) => {
            res.render('posts-index', { posts });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

module.exports = router;
