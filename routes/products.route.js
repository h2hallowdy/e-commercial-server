const express = require('express');
var router =express.Router();

var controller = require('../controllers/products.controller');
router.get('/', controller.index);
router.get('/:category', controller.category);

module.exports = router;