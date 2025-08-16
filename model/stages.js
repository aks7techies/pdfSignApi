const mongoose = require('mongoose');

const stagesDataSchema = new mongoose.Schema({

    stage:{
        type:Number,
        required:true,
    }

},{timestamps:true});

const StagesModal = mongoose.model('StagesModal',stagesDataSchema);
module.exports = StagesModal;