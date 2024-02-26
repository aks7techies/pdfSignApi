const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({
    userId: String,
    name: String,
    email: String,
    documentName: String,
    originalFileName: String,
    isActive:{
        type:Boolean,
        default:true
    },
    isDelete: {
        type: Number,
        default: 0 // Default value set to 0
    }
},{timestamps:true}
);

const UserInsertModal = mongoose.model("UserInsertModal", userDetailSchema);

module.exports ={UserInsertModal};

