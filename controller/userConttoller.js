const UserInsertModal = require('../model/draftDataProcessModal'); // Adjust the path as needed
const {getToken} = require("../middleware/auth");
const multer = require("multer");

const handleGetAllUser = async (req, res) => { 
  try {
     const token_ = getToken(req.params.token);
    if(!token_.status){
      return res.status(401).json({ msg: "Unauthorized" });
    }else{

      const allDbusers = await UserInsertModal.find({});
      if(allDbusers && allDbusers.length >0){
        return res.status(200).json({ status: true, msg: "Data found successfully.", data: allDbusers });
      }else {
           return res.status(404).json({ status: false, msg: "Data not found." });
         }
    }
  } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }

  
};
const handleGetUserById = async (req, res) => {

  try {
    const token_ = getToken(req.body.token);
   if(!token_.status){
     return res.status(401).json({ msg: "Unauthorized" });
   }else{

    const user = await UserInsertModal.findById(req.params.id);
     if(user && user.length >  0){
       return res.status(200).json({ status: true, msg: "Data found successfully.", data: user });
     }else {
          return res.status(404).json({ status: false, msg: "Data not found." });
      }
   }
 } catch (error) {
     console.log("Error:", error);
     return res.status(500).json({ status: false, msg: "Internal Server Error" });
 }
};
const handleUpdateUserById = async (req, res) => {
  try {
    const token_ = getToken(req.body.token);
   if(!token_.status){
     return res.status(401).json({ msg: "Unauthorized" });
   }else{

    const user = await UserInsertModal.findByIdAndUpdate(req.body._id,req.body.clientId, {stage: req.body.stage});
     if(user){
       return res.status(200).json({ status: true, msg: "Data Update successfully.", data: user });
     }else {
          return res.status(404).json({ status: false, msg: "Data not Update." });
      }
   }
 } catch (error) {
     console.log("Error:", error);
     return res.status(500).json({ status: false, msg: "Internal Server Error" });
 }
};
const handleDeleteUserById = async (req, res) => {
  await UserInsertModal.findByIdAndDelete(req.params.id);
  return res.json({status: "Success"});
};
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/orginalDocument/"); // Destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // File naming strategy
  },
});
const fileFilter = function (req, file, cb) {
  // Allow only .doc and .docx file extensions
  const allowedExtensions = ['.pdf'];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(extname)) {
      // If extension is allowed, accept the file
      cb(null, true);
  } else {
      // If extension is not allowed, reject the file
      cb(new Error('Only .pdf file are allowed'));
  }
};
const upload = multer({storage: storage,fileFilter: fileFilter}).single("originalFileName");
const handleCreateUserById = async (req, res) => {
  // Use try-catch block to handle asynchronous errors
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error("Multer Error:", err);
        return res.status(500).json({msg: "File upload failed"});
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error("Unknown Error:", err);
        return res.status(500).json({msg: "File upload failed"});
      }

      const body = req.body;
      const token = await getToken(body.token);

      if (!token.status) {
        // Return unauthorized status if token is invalid
        return res.status(401).json({msg: "Unauthorized"});
      }

      // Check if all required fields are present
      if (!body || !body.name || !body.email || !body.documentName) {
        return res.status(400).json({msg: "All fields are required..."});
      }

      const filename = req.file ? req.file.filename : null;

      // Create user record
      const result = await UserInsertModal.create({
        clientId: body.clientId,
        draftDocumentName: body.draftDocumentName,
        originalFileName: filename,
        stage:body.stage,
        coordinate:body.coordinate,
        dateTimeOriginal:body.dateTimeOriginal,
      });

      return res.status(201).json({msg: "Success", data: result});
    });
  } catch (error) {
    // Handle internal server errors
    console.error(error);
    return res.status(500).json({msg: "Internal Server Error"});
  }
};

module.exports = {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUserById,
};
