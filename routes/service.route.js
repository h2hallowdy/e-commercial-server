const express = require('express');
var router = express.Router();

var controller = require('../controllers/service.controller');

router.get('/', controller.index);
router.post('/', controller.service);

module.exports = router;