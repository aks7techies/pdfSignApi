const UserInsertModal = require("../model/draftDataProcessModal"); // Adjust the path as needed
const {getToken} = require("../middleware/auth");
// const multer = require("multer");
// const path = require("path");

const handleGetAllUnProcess = async (req, res) => {
    try {
      const token = getToken(req.query.token);
      if (!token.status) {
        return res.status(401).json({msg: "Unauthorized"});
      } else {
        const getData = await UserInsertModal.find({
          clientId: req.query.clientId,
          stage: 1,
        });
        if (getData && getData.length > 0) {
          return res
            .status(200)
            .json({status: true, msg: "Data found successfully.", data: getData});
        } else {
          return res
            .status(200)
            .json({status: true, msg: "Data not found.", data: []});
        }
      }
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({status: false, msg: "Internal Server Error"});
    }
  };
const handleUpdateUnProcess = async (req, res) => {
    try {

      const token = getToken(req.body.token);
      // console.log(req.body.token)
      if (!token.status) {
        return res.status(401).json({msg: "Unauthorized"});
      } else {
       
        const updateData = await UserInsertModal.findByIdAndUpdate(req.body.id, {
          stage: req.body.stage,
        });
        if (updateData) {
          return res.status(200).json({
            status: true,
            msg: "Data updated successfully.",
            data: updateData,
          });
        } else {
          return res
            .status(400)
            .json({status: false, msg: "Data not found or not updated.",data:[]});
        }
      }
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({status: false, msg: "Internal Server Error"});
    }
  };

module.exports= {
    handleUpdateUnProcess,
    handleGetAllUnProcess
};