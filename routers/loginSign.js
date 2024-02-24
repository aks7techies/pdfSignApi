const express = require('express');
const { handleLogin, handlePostSignUp } = require('../controller/userLogin');
const router = express.Router();

router.route("/login").post(handleLogin);
router.route("/signUp").post(handlePostSignUp);

module.exports = router;
