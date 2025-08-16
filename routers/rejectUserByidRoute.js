const express = require("express");
const {handleRejectUserById,handleUpdateRejected,RejectedAllData} = require('../controller/rejectUserByIdControll');
const router = express.Router();
router.route('/postRejectUser').post(handleRejectUserById);
router.route('/RejectUserUpdate').patch(handleUpdateRejected);
router.route('/').get(RejectedAllData);


module.exports = router;