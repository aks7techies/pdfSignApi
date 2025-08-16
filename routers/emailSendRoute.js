const express = require('express');
const {handleEmailSend} = require('../controller/emailSendController');
const router = express.Router();

router.route('/sendEmailPost').post(handleEmailSend);

module.exports = router;