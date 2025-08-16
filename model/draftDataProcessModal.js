const mongoose = require("mongoose");
<<<<<<< HEAD
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userDetailSchema = new Schema(
  {
    clientId: {
      type: ObjectId,
=======
// function validateFileExtension(value) {
//   const validExtensions = ["pdf"]; // Add more extensions as needed
//   const fileExtension = value.substring(value.lastIndexOf(".")).toLowerCase();
//   return validExtensions.includes(fileExtension);
// }
const userDetailSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
      required: true,
    },
    draftDocumentName: {
      type: String,
      required: true,
    },
    originalFileName: {
      type: String,
      required: true
    },
    stage: {
      type: Number,
      required: true,
      default: 0,
    },
    coordinate: {
      type: Array,
    },
    dateTimeOriginal: {
<<<<<<< HEAD
      type: String,
      required: true
=======
      type:String,
      required:true
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Number,
      default: 0,
    },
<<<<<<< HEAD
    previousDraftId:{
      type: ObjectId,
      default:null
    },
    rejectRemark:{
      type: String,
    },
    isRejected:{
      type:Number,
      default:0
    },
    token:{
      type: String,
      required: true
    }
=======
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
  },
  { timestamps: true }
);

const UserInsertModal = mongoose.model("UserInsertModal", userDetailSchema);

module.exports = UserInsertModal;
