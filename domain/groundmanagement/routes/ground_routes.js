var express = require('express');
var router = express.Router();

const groundController = require('../controller/groundController');

router.get('/', groundController.index);
router.get('/:id', groundController.read);
router.get('/:id/approve-fuel', groundController.approveFuel);

module.exports = router;
