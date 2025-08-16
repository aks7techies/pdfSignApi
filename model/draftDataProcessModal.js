const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userDetailSchema = new Schema(
  {
    clientId: {
      type: ObjectId,
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
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Number,
      default: 0,
    },
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
  },
  { timestamps: true }
);

const UserInsertModal = mongoose.model("UserInsertModal", userDetailSchema);

module.exports = UserInsertModal;
