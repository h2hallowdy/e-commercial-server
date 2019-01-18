var Session = require('../models/session.model');

module.exports.addToCart = function (req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
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
                qty: 1
            };
            session.totalQty++;
            session.cart.push(cart);
        }
        else {
            storedItem.forEach((item, index) => {
                if (item.itemId === productId) {
                    item.qty++;
                    session.totalQty++;
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