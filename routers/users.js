const express = require('express');
const { handleGetAllUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUserById } = require('../controller/userConttoller'); // Corrected typo in controller name
const router = express.Router();

router.route('/').get(handleGetAllUser).post(handleCreateUserById);
router.route('/delete').delete(handleDeleteUserById);
router.route('/update').patch(handleUpdateUserById);
router.route('/:id').get(handleGetUserById);
    
module.exports = router;
