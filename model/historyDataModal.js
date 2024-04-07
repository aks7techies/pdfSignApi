const mongoose = require('mongoose');

const historyDataSchema = new mongoose.Schema({
    
    clientId:{
        type:String,
        required:true
    },
    draftId:{
        type:String,
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