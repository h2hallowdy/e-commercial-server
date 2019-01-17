var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    sessionName: String,
    cart: [

    ]
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;