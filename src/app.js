require('./data/reddit-db');
require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const expressValidator = require('express-validator');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const cookieParser = require('cookie-parser');

const checkAuth = require('./middleware/checkAuth');

const homeRouter = require('./routes/home');
const postsRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const replyRouter = require('./routes/replies');
const authRouter = require('./routes/auth');

const app = express();

// Middlewares
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(expressValidator());
app.use(checkAuth);

// View engine
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Routes
app.use(homeRouter);
app.use(authRouter);
app.use(postsRouter);
app.use(commentRouter);
app.use(replyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Reddit clone listening on port: ${PORT}`);
});

module.exports = app;
