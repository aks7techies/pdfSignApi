const mongoose = require("mongoose");
// function validateFileExtension(value) {
//   const validExtensions = ["pdf"]; // Add more extensions as needed
//   const fileExtension = value.substring(value.lastIndexOf(".")).toLowerCase();
//   return validExtensions.includes(fileExtension);
// }
const userDetailSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
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
      type: Object,
    },
    dateTimeOriginal: {
      type:String,
      required:true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserInsertModal = mongoose.model("UserInsertModal", userDetailSchema);

module.exports = UserInsertModal;
