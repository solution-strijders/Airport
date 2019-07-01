var express = require('express');
var router = express.Router();

const departmentController = require('../controller/departmentController');

router.get('/', departmentController.Index);
router.post('/', departmentController.Create);
router.post('/billSpaces', departmentController.BillSpaces);
router.post('/billPassengers', departmentController.BillPassengers);

module.exports = router;