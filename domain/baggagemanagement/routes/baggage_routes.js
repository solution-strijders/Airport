var express = require('express');
var router = express.Router();

const baggageController = require('../controller/baggageController');

/* GET users listing. */
router.get('/', baggageController.RetrieveFromFlight);
router.post('/:id', baggageController.Stow);

router.get('/flights', baggageController.GetListOfFlights);

module.exports = router;