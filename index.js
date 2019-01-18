require('dotenv').config();

const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const productsRoute = require('./routes/products.route');
const cartRoute = require('./routes/cart.route');
var sessionMiddleware = require('./middlewares/session.middleware');
const port = 3000;
const app = express();


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));
app.use(sessionMiddleware);
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

app.use('/products', productsRoute);
app.use('/cart', cartRoute);

app.listen(port, function() {
    console.log(`Server listening to port ${port}`)
});