const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

// GET
router.get('/sign-up', (_, res) => {
    res.render('sign-up');
});

router.get('/logout', (_, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

// POST
router.post('/sign-up', (req, res) => {
    // Create User and JWT
    const user = new User(req.body);

    console.log('FIRED');

    user.save()
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(400).send({ err: err });
        });
});

module.exports = router;
