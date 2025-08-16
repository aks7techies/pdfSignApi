const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controller/uploadFileController");

router.post("/uploadFile", uploadFile);

module.exports = router;
