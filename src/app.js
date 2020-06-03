require('./data/reddit-db');
const express = require('express');
const { json, urlencoded } = require('body-parser');
const expressValidator = require('express-validator');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const homeRouter = require('./routes/home');
const postsRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');

const app = express();

// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(expressValidator());

// View engine
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.use(homeRouter);
app.use(postsRouter);
app.use(commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Reddit clone listening on port: ${PORT}`);
});

module.exports = app;
