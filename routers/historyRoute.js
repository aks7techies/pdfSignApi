const express = require('express');
const {handleAllGetHistory,handlePostHistory} = require('../controller/historyController');
const router = express.Router();

router.route('/').get(handleAllGetHistory).post(handlePostHistory);

module.exports = router;


