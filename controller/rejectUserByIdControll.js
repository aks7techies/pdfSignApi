
const UserInsertModal = require("../model/draftDataProcessModal"); // Adjust the path as needed
const VerificationModal = require("../model/verificationDataModal");
const {getToken} = require("../middleware/auth");
const mongoose = require('mongoose');
const  ObjectId  = mongoose.Types.ObjectId;
const handleRejectUserById = async (req, res) => {
    try {
        const body = req.body;
        const token = await getToken(body.token);
        if (!token.status) {
          return res.status(401).json({msg: "Unauthorized"});
        }
         const recordFund = await UserInsertModal.findById( body.draftId); 
        const obj  = JSON.parse(JSON.stringify(recordFund));
        if (recordFund) {
       
          const result = await UserInsertModal.create({
            clientId: obj.clientId,
            previousDraftId:obj._id,
            draftDocumentName: obj.draftDocumentName,
            originalFileName: obj.originalFileName,
            coordinate: obj.coordinate,
            stage:1,
            isRejected:1,
            dateTimeOriginal: obj.dateTimeOriginal,
            rejectRemark:body.remark,
            token:body.token
          });
          const insertedId = result._id; // Get the inserted ID
    
          return res
            .status(201)
            .json({status:true, msg: "Success Rejected", data: result, insertedId: insertedId});
        } 
    } catch (error) {
      // Handle internal server errors
      console.error(error);
      return res.status(500).json({msg: "Internal Server Error"});
    }
  };


  const handleUpdateRejected = async (req, res) => {
    const dataObj = req.body;
    try {
      const token = await getToken(dataObj.token);
      if (!token.status) {
        return res.status(401).json({msg: "Unauthorized"});
      } else {
        const id = req.body.id;
        const updateResult = await VerificationModal.findByIdAndUpdate(id, {
          isVerification: dataObj.isVerification,
          stage:dataObj.stage,
          isRejectedDate:dataObj.isRejectedDate,
        });
        // console.log(updateResult);
        if (updateResult) {
          return res
            .status(200)
            .json({status: true, msg: "Update Success", data: updateResult});
        } else {
          return res
            .status(200)
            .json({status: false, msg: "Update Not Success.",data:[]});
        }
      }
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({status: false, msg: "Internal Server Error"});
    }
  };

const RejectedAllData = async(req, res)=>{
   try {
    const clientId = new ObjectId(req.query.clientId);
    const token = getToken(req.query.token);
    if(!token.status){
      return res.status(401).json({msg: "Unauthorized"});
    }else{
      
      const result =  await VerificationModal.aggregate([
        {
          $lookup: {
            from: "userinsertmodals",
            localField: "draftId",
            foreignField: "previousDraftId",
            as: "userinsertmodals"
          }
        },
        {
          $match: {
            "stage":2,
            "clientId":clientId,
            "isVerification":0,
            "userinsertmodals.stage":1,
            "userinsertmodals.isRejected":1,
      
            
          }
          
        }
      ]);
      if (result && result.length > 0) {
        return res
          .status(200)
          .json({
            status: true,
            msg: "Data found successfully.",
            data: result});
      } else {
        return res
          .status(200)
          .json({status: false, msg: "Data Not found successfully.",data:[]});
      }
    }
   } catch (error) {
    console.log("Error:", error);
      return res.status(500).json({status: false, msg: "Internal Server Error"});
   }


}

module.exports = {handleRejectUserById,handleUpdateRejected, RejectedAllData};