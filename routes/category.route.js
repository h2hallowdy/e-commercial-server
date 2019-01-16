const express = require('express');
var router =express.Router();

var controller = require('../controllers/category.controller');
router.get('/:category', controller.index);

module.exports = router;