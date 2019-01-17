var Product = require('../models/product.model');
var Session = require('../models/session.model');
module.exports.index = function(req, res) {
    var sessionId = req.signedCookies.sessionId;
    Product.find().then(function(products) {
        Session.find({ sessionName: sessionId }).then(function(sessions) {
            console.log(sessions[0].cart);
            res.render('products/index', {
                products: products,
                carts: sessions[0].cart
            });
        });
        
    })  
};

module.exports.category = function(req, res) {
    var sessionId = req.signedCookies.sessionId;
    const category = req.params.category;
    Product.find({ category: category }).then(function(products) {
        Session.find({ sessionName: sessionId }).then(function(sessions) {
            res.render('products/index', {
                products: products,
                carts: sessions[0].cart
            });
        });
    })
};