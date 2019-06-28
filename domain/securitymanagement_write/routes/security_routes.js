var express = require('express');
var router = express.Router();

const securityController = require('../controller/securityController');

/* GET users listing. */
router.get('/', securityController.Index);

module.exports = router;
