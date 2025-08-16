const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const emailSendSchema = new Schema({
    clientId:{
        type:ObjectId,
        required:true
    },
    draftId:{
        type:ObjectId,
        required:true
    },
    emailTo:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
    
},{timestamps:true});

const EmailModal = new mongoose.model('EmailModal',emailSendSchema);

module.exports = EmailModal;
