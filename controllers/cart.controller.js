var Session = require('../models/session.model');
var Product = require('../models/product.model');
module.exports.index = async function(req, res, next) {
    var sessionId = req.signedCookies.sessionId;
    var message = '';
    var items = [];
    if(!sessionId) {
        message = "Đã có lỗi xảy ra, vui lòng quay lại trang chủ..."; 
    }
    var session = await Session.find({ sessionName: sessionId });
    items.push(...session[0].cart);
    res.render('cart/index', {
        message: message,
        items: items,
        session: session[0]
    });
}
module.exports.addToCart = async function (req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    var product = await Product.findOne({ _id: productId });
    if (!sessionId) {
        res.redirect('/products');
        return;
    }

    Session.findOne({ sessionName: sessionId }, function (err, session) {
        var storedItem = session.cart;
        var ids = [];
        storedItem.forEach(item => ids.push(item.itemId));
        if (ids.indexOf(productId) === -1) {
            var cart = {
                itemId: productId,
                qty: 1,
                name: product.name,
                price: product.price
            };
            session.totalQty++;
            session.totalPrice += parseInt(product.price);
            session.cart.push(cart);
        }
        else {
            storedItem.forEach((item, index) => {
                if (item.itemId === productId) {
                    item.qty++;
                    session.totalQty++;
                    session.totalPrice += parseInt(product.price);
                }
                session.cart = [];
                session.cart.push(...storedItem);
            });
        }
         
        session.save(function(err) {
            if(err) {
                res.redirect('/');
            }
        });
    });

    res.redirect('/products');
}

module.exports.charge = function(req, res, next) {
    res.render('cart/charge');
}
module.exports.chargePost = function(req, res, next) {
    console.log(req.body);
    res.redirect('/');
}