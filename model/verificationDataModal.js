const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const VerificationSchema = new Schema({
    
    clientId:{
        type:ObjectId,
        required:true
    },
    draftId:{
        type:ObjectId,
        required:true
    },
    coordinate:{
        type:String,
        required:true
    },
    dateFiled:{
        type:String,
        required:true
    },
    photoFile:{
        type:String,
        required:true
    },
    Signature:{
        type:String,
        required:true
        
    },
    pdfSignerFile:{
        type:String,
        required:true,
    },
    Singer_date:{
       type:String,
       required:true
    },
    isVerification:{
        type:Number,
        default:0
    },
    isVerificationDate:{
        type:String,  
    },
    isRejectedDate:{
        type:String,
    },
    stage:{
      type:Number,
      default:0
    }

},{timestamps:true});

const VerificationModal = mongoose.model('VerificationModal',VerificationSchema);
module.exports = VerificationModal;