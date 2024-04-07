const express = require('express');
const { handleLogin, handlePostSignUp,handlePatchUser } = require('../controller/userLogin');
const router = express.Router();

router.route("/login").post(handleLogin);
router.route("/signUp").post(handlePostSignUp);
router.route("/UpdateProfile").patch(handlePatchUser);

module.exports = router;
