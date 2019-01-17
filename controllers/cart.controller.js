var Session = require('../models/session.model');
module.exports.addToCart = function (req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    console.log(sessionId);

    if (!sessionId) {
        res.redirect('/products');
        return;
    }
    var cart = {};
    var count = 0;
    cart[productId] = count + 1; 
    Session.findOne({ sessionName: sessionId }, function(err, result) {
        
        result.cart.push(cart);
        result.save();
    })
   
    res.redirect('/products');
}