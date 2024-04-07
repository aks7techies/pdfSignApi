const mongoose = require('mongoose');

const clientMasterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(value) {
                // Regular expression for email validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    isActive:{
        type:Number,
        default:0
    },
    isDelete:{
        type:Boolean,
        default: false
    }
}, { timestamps: true });

const ClientModal = mongoose.model('ClientModal', clientMasterSchema);

module.exports = ClientModal;
