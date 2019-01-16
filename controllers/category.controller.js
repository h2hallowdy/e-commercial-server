module.exports.index = function(req, res) {
    const category = req.params;
    res.render('categories/index', {
        category: category
    });
};