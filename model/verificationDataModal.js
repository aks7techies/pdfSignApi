const mongoose = require('mongoose');
<<<<<<< HEAD
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
=======
function validateFileExtension(value) {
    const validExtensions = ['.pdf']; // Add more extensions as needed
    const fileExtension = value.substring(value.lastIndexOf('.')).toLowerCase();
    return validExtensions.includes(fileExtension);
}
const VerificationSchema = new mongoose.Schema({
    
    clientId:{
        type:String,
        required:true
    },
    draftId:{
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
        type:String,
        required:true
    },
    photoFile:{
        type:String,
        required:true
<<<<<<< HEAD
=======
        
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
    },
    Signature:{
        type:String,
        required:true
        
    },
    pdfSignerFile:{
        type:String,
        required:true,
<<<<<<< HEAD
=======
        validate: {
            validator: validateFileExtension,
            message: props => `${props.value} is not a valid file extension. Only .pdf  files are allowed.`
        }

>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
    },
    Singer_date:{
       type:String,
       required:true
    },
    isVerification:{
        type:Number,
        default:0
<<<<<<< HEAD
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
=======
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
    }

},{timestamps:true});

const VerificationModal = mongoose.model('VerificationModal',VerificationSchema);
module.exports = VerificationModal;