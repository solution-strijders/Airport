var express = require('express');
var router = express.Router();

const billController = require('../controller/billController');

router.get('/', billController.Index);

module.exports = router;