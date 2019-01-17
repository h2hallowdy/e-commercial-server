var Product = require('../models/product.model');
module.exports.index = function(req, res) {
    Product.find().then(function(products) {
        res.render('products/index', {
            products: products
        });
    })  
};

module.exports.category = function(req, res) {
    const category = req.params.category;
    Product.find({ category: category }).then(function(products) {
        res.render('products/index', {
            products: products
        });
    })
};