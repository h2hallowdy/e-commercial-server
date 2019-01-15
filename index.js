const express = require('express');
var bodyParser = require('body-parser');


const categoryRoute = require('./routes/category.route');


const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function(req, res) {
    res.render('index');
});

app.use('/category', categoryRoute);

app.listen(port, function() {
    console.log(`Server listening to port ${port}`)
});