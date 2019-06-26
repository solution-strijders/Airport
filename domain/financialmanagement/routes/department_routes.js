var express = require('express');
var router = express.Router();

const departmentController = require('../controller/DepartmentController');

/* GET users listing. */
router.get('/', departmentController.Index);

module.exports = router;