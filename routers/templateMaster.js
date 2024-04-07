const express = require('express');
const {handleTemplateGet,handleTemplatePost,handleOnetemplateGet} = require('../controller/templateMaster');
const router = express.Router();
router.route('/').get(handleTemplateGet).post(handleTemplatePost);
router.route('/oneget').get(handleOnetemplateGet);

module.exports = router;