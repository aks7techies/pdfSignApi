const mongoose = require('mongoose');
function validateFileExtension(value) {
    const validExtensions = ['.pdf']; // Add more extensions as needed
    const fileExtension = value.substring(value.lastIndexOf('.')).toLowerCase();
    return validExtensions.includes(fileExtension);
}
const historyDataSchema = new mongoose.Schema({
    
    clientId:{
        type:String,
        required:true
    },
    draftId:{
        type:String,
        required:true
    },
    photoFile:{
        type:String,
        required:true
        
    },
    pdfSignerFile:{
        type:String,
        required:true,
        validate: {
            validator: validateFileExtension,
            message: props => `${props.value} is not a valid file extension. Only .pdf  files are allowed.`
        }

    },
    Singer_date:{
       type:String,
       required:true
    },
    isVerification:{
        type:Number,
        default:0
    }

},{timestamps:true});

const HistoryModal = mongoose.model('HistoryModal',historyDataSchema);
module.exports = HistoryModal;