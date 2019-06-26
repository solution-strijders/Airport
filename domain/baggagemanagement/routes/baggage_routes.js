var express = require('express');
var router = express.Router();

const baggageController = require('../controller/baggageController');

/* GET users listing. */
router.get('/', baggageController.RetrieveFromFlight);
router.post('/', baggageController.Stow);

router.post('/test', baggageController.Test);

module.exports = router;
