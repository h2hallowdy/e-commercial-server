var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    sessionName: String,
    cart: [],
    totalQty: Number,
    totalPrice: Number
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;