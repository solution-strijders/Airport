var express = require('express');
var router = express.Router();

const borderController = require('../controller/borderController');

/* GET users listing. */
router.get('/', borderController.GetPassengers);
router.post('/', borderController.CreatePassenger);

module.exports = router;
