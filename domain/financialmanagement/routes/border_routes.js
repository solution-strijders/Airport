var express = require('express');
var router = express.Router();

const borderController = require('../controller/borderController');

router.get('/', borderController.GetPassengers);
router.delete('/', borderController.CheckPassenger);

module.exports = router;
