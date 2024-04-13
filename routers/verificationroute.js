const express = require('express');
const {handleGetAllVerification,handlePostVerification,handleUpdateVerification,handleUpdateButtonVerification} = require('../controller/verificationController');
const router = express.Router();

router.route('/').get(handleGetAllVerification).post(handlePostVerification);

router.route('/:id').put(handleUpdateVerification);

module.exports = router;