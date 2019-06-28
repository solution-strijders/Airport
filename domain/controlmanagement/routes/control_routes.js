var express = require('express');
var router = express.Router();

const controlController = require('../controller/controlController');

router.get('/', controlController.index);
router.get('/:id', controlController.read);
router.get('/:id/approve-takeoff', controlController.approveTakeoff);
router.get('/:id/approve-landing', controlController.approveLanding);

module.exports = router;