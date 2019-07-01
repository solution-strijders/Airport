var express = require('express');
var router = express.Router();

const flightController = require('../controller/flightController');

/* GET flight listing. */
router.get('/:id', flightController.GetFlight);
router.get('/', flightController.GetFlights);
router.post('/', flightController.PostFlight);
router.put('/:id', flightController.ChangeStatus);

router.post('/plane', flightController.PostPlane);
router.post('/airline', flightController.PostAirline);

module.exports = router;
