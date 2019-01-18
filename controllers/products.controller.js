var Product = require('../models/product.model');
var Session = require('../models/session.model');
module.exports.index = function(req, res) {
    var sessionId = req.signedCookies.sessionId;
    Product.find().then(function(products) {
        Session.find({ sessionName: sessionId }).then(function(sessions) {
            var sessions = sessions[0] ? sessions[0] : [];
            res.render('products/index', {
                products: products,
                carts: sessions
            });
        });
        
    })  
};

module.exports.category = function(req, res) {
    var sessionId = req.signedCookies.sessionId;
    const category = req.params.category;
    Product.find({ category: category }).then(function(products) {
        Session.find({ sessionName: sessionId }).then(function(sessions) {
            var sessions = sessions[0] ? sessions[0] : [];
            res.render('products/index', {
                products: products,
                carts: sessions
            });
        });
    })
};