var shortid = require('shortid');

var Session = require('../models/session.model');
module.exports = function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        var session = new Session({
            sessionName: sessionId,
            cart: [],
            totalQty: 0,
            totalPrice: 0
        });
        session.save(function(err, session) {
            if(err) return console.log(err);
            console.log(session);
        });       
    }
    next();
}