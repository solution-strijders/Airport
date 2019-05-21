var express = require('express');
var router = express.Router();

const userController = require('../controller/baggageController');

/* GET users listing. */
router.get('/', userController.Get);

module.exports = router;
