const UserInsertModal = require("../model/draftDataProcessModal");
const {getToken} = require("../middleware/auth");

const handleAllGetProcess = async (req, res) => {
  try {
    const token = getToken(req.query.token);
    if (!token.status) {
      return res.status(401).json({msg: "Unauthorized"});
    } else {
      const getData = await UserInsertModal.find({
        clientId: req.query.clientId,
        stage: 2,
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


// const handlePostProcessData = async(req,res)=>{


// };

module.exports = {handleAllGetProcess};