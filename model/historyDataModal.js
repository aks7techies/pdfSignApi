const mongoose = require('mongoose');
<<<<<<< HEAD
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const historyDataSchema = new Schema({
    
    clientId:{
        type:ObjectId,
        required:true
    },
    draftId:{
        type:ObjectId,
=======

const historyDataSchema = new mongoose.Schema({
    
    clientId:{
        type:String,
        required:true
    },
    draftId:{
        type:String,
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
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