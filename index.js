require('dotenv').config();
const express = require('express');
const app = express();
const Render = require('./render');
const methodOverride = require('method-override');

//Middle ware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/', (req, res) => {
    res.render('Home');
});

// Load the places controller
app.use('/places', require('./controllers/places'));


// Wildcard/404 route
app.get('*', (req, res) => {
    res.render('error404');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
