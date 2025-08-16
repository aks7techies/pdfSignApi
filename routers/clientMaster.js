const express = require('express');
const {handleGetAllClient,handlePostAddClient} = require('../controller/clientMaster');
const router = express.Router();
router.route('/').get(handleGetAllClient).post(handlePostAddClient);



module.exports = router;
