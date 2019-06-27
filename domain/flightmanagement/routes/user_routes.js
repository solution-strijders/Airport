var express = require('express');
var router = express.Router();

const userController = require('../controller/baggageController');

/* GET users listing. */
router.get('/', userController.Claim);
router.post('/', userController.Store);

module.exports = router;
