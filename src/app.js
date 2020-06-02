const express = require('express');
const { urlencoded } = require('body-parser');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express();

// Middlewares
app.use(urlencoded({ extended: true }));

// View engine
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Reddit clone listening on port: ${PORT}`);
});
