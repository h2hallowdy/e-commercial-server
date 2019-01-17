var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    image: String,
    description: String,
    type: String
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;