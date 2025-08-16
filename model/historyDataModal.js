const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const historyDataSchema = new Schema({
    
    clientId:{
        type:ObjectId,
        required:true
    },
    draftId:{
        type:ObjectId,
        required:true
    },
   
    Activity:{
        type:String,
        required:true
        
    },
    discription:{
        type:String,
        required:true
    }
},{timestamps:true});

const HistoryModal = mongoose.model('HistoryModal',historyDataSchema);
module.exports = HistoryModal;