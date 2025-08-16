const mongoose = require('mongoose');
<<<<<<< HEAD
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const templateMasterSchema = new Schema({
   adminUserId:{
      type:ObjectId,
      required:true
   },
=======

// Define a custom validator function to check the file extension
// function validateFileExtension(value) {
//     const validExtensions = ['.doc', '.docx']; // Add more extensions as needed
//     const fileExtension = value.substring(value.lastIndexOf('.')).toLowerCase();
//     return validExtensions.includes(fileExtension);
// }

const templateMasterSchema = new mongoose.Schema({
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
    documentName: {
        type: String,
        required: true
    },

    document: {
        type: String,
        required: true
    },
    isActive:{
        type:Number,
        default: 0
    }
}, { timestamps: true });

const TemplateModal = mongoose.model('TemplateModal', templateMasterSchema);

module.exports = TemplateModal;
