const express = require('express');

const User = require('../models/user');
const Post = require('../models/post');

const router = express.Router();

// GET
router.get('/posts/new', (req, res) => {
    const currentUser = req.user;
    res.render('posts-new', { currentUser });
});

router.get('/posts/:id', function (req, res) {
    const currentUser = req.user;

    Post.findById(req.params.id)
        .populate({ path: 'comments', populate: { path: 'author' } })
        .populate('author')
        .then((post) => {
            res.render('posts-show', { post, currentUser });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

router.get('/n/:subreddit', function (req, res) {
    const currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit })
        .populate('author')
        .then((posts) => {
            res.render('posts-index', { posts, currentUser });
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST
router.post('/posts/new', (req, res) => {
    if (req.user) {
        const post = new Post(req.body);
        post.author = req.user._id;

        post.save()
            .then((post) => {
                return User.findById(req.user._id);
            })
            .then((user) => {
                user.posts.unshift(post);
                user.save();
                // REDIRECT TO THE NEW POST
                res.redirect(`/posts/${post._id}`);
            })
            .catch((err) => {
                console.log(err.message);
            });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
});

module.exports = router;
