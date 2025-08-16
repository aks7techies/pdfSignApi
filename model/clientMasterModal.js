<<<<<<< HEAD
const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const clientMasterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          // Regular expression for email validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    mobileNo: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[6-9][0-9]{9}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid mobile Number!`,
      },
    },
    insertedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Optional: add this if referencing another model
    },
    isActive: {
      type: Number,
      default: 0,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
=======
const mongoose = require('mongoose');

const clientMasterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
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
    mobileNo:{
        type:String,
        required:true,
        validate:{
            validator: function(value){
                return /^[6-9][0-9]{9}$/.test(value);
            },
            message: props => `${props.value} is not a valid mobile Number!`
        }
    },
    isActive: {
        type: Number,
        default: 0
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7

// Remove unique constraint from email field
// Remove the 'unique: true' property from the email field definition

<<<<<<< HEAD
const ClientModal = mongoose.model("ClientModal", clientMasterSchema);
=======
const ClientModal = mongoose.model('ClientModal', clientMasterSchema);
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7

module.exports = ClientModal;
