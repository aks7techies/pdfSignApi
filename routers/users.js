const express = require('express');
const { handleGetAllUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUserById } = require('../controller/userConttoller');
const router = express.Router();

router.route('/')
    .get(handleGetAllUser)
    .post(handleCreateUserById);

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;