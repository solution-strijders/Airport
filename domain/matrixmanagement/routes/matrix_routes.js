var express = require('express');
var router = express.Router();

const matrixController = require('../controllers/matrix_controller');

/* GET flight listing. */
router.get('/', matrixController.Get);


module.exports = router;