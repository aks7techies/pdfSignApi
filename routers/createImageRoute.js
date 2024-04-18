const express = require('express');
const {handleImageCreate} = require('../controller/createImageController');
const router = express.Router();

router.route('/').get(handleImageCreate);

module.exports= router;