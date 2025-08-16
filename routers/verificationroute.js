const express = require('express');
const {handleGetAllVerification,handlePostVerification,handleGetAllArchiveData,handleUpdateButtonVerification,handleGetSingledata} = require('../controller/verificationController');
const router = express.Router();

router.route('/').get(handleGetAllVerification).post(handlePostVerification);
router.route('/getVerifyData').get(handleGetSingledata);
router.route('/updateVerifyData').patch(handleUpdateButtonVerification);

router.route('/getAllArchiveData').get(handleGetAllArchiveData);

module.exports = router;