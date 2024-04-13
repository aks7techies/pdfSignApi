const express = require('express');
const {handleUpdateUnProcess,handleGetAllUnProcess} = require('../controller/unProcess');
const router = express.Router();

router.route('/getAllprocess').get(handleGetAllUnProcess);
router.route('/updateUncomplete').patch(handleUpdateUnProcess);

module.exports = router;
