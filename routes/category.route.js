const express = require('express');
var router =express.Router();

router.get('/:category', function(req, res) {
    res.render('categories/index');
});

module.exports = router;