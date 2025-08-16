const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const templateMasterSchema = new Schema({
   adminUserId:{
      type:ObjectId,
      required:true
   },
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
