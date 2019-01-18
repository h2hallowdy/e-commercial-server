var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    sessionName: String,
    cart: [],
    totalQty: Number
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;