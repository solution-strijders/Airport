var express = require('express');
var router = express.Router();

const spaceController = require('../controller/spaceController');

/* GET users listing. */
router.get('/', spaceController.Index);
router.post('/', spaceController.Create);
router.post('/reserve/:id', spaceController.ReserveSpace);

module.exports = router;