const mongoose = require('mongoose');

const uploadedFileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

module.exports = mongoose.model('UploadedFile', uploadedFileSchema);
