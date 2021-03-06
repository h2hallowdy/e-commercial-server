require('dotenv').config();

const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const productsRoute = require('./routes/products.route');
const cartRoute = require('./routes/cart.route');
const serviceRoute = require('./routes/service.route');
var sessionMiddleware = require('./middlewares/session.middleware');
const port = 80;
const app = express();


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(express.static('public'));

// Home page
var Session = require('./models/session.model');
app.get('/', function(req, res) {
    var sessionId = req.signedCookies.sessionId;
    if(!sessionId) {
        res.render('index');
        return;
    }
    Session.find({ sessionName: sessionId }).then(function(sessions) {
        var sessions = sessions[0] ? sessions[0] : [];
        res.render('index', {
            carts: sessions
        });
    })
});
app.get('/color', function(req, res) {
    res.render('color');
});

app.get('/about', function(req, res) {
    res.render('about');
});
app.get('/contact', function(req, res) {
    res.render('contact');
})

app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/service', serviceRoute);

app.listen(port, function() {
    console.log(`Server listening to port ${port}`)
});