var express = require('express');
var router = express.Router();

const checkInController = require('../controller/checkinController');

/* GET users listing. */
router.get('/', checkInController.GetCheckIns);
router.post('/', checkInController.CheckIn);

module.exports = router;