var express = require('express');
var router = express.Router();

const flightController = require('../controller/flightController');

/* GET flight listing. */
router.get('/:id', flightController.GetFlight);
router.post('/', flightController.PostFlight);
router.put('/:id', flightController.ChangeStatus);

module.exports = router;
