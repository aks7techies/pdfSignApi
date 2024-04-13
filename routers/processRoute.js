const express = require('express');
const {handleAllGetProcess} = require('../controller/processController');
const router = express.Router();

router.route('/process').get(handleAllGetProcess);

module.exports = router;