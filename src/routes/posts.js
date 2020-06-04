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
        .populate('comments')
        .lean()
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
        .lean()
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
        post.upVotes = [];
        post.downVotes = [];
        post.voteScore = 0;

        post.save()
            .then(() => {
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

// PUT
router.put('/posts/:id/vote-up', function (req, res) {
    Post.findById(req.params.id).exec(function (err, post) {
        post.upVotes.push(req.user._id);
        post.voteScore = post.voteScore + 1;
        post.save();

        res.status(200);
    });
});

router.put('/posts/:id/vote-down', function (req, res) {
    Post.findById(req.params.id).exec(function (err, post) {
        post.downVotes.push(req.user._id);
        post.voteScore = post.voteScore - 1;
        post.save();

        res.status(200);
    });
});

module.exports = router;
