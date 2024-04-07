const TemplateModal = require('../model/templateMasterModal'); // Adjust the path as needed
const {getToken} = require("../middleware/auth");
const multer = require("multer");
const path = require('path');

const handleTemplateGet = async(req, res)=>{

    const token_ = req.query.token;
    try {
        
        const token = await getToken(token_);
        if(!token.status){
            return res.status(401).json({ msg: "Unauthorized" });
        }else{
           const data = await TemplateModal.find({});
           if (data && data.length > 0) {
            return res.status(200).json({ status: true, msg: "Data found successfully.", data: data });
        } else {
            return res.status(404).json({ status: false, msg: "Data not found." });
        }

        }
    } catch (error) {
         console.log("Error:", error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }



}

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/templateDocument/"); // Destination folder where files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // File naming strategy
    },
  });
  const fileFilter = function (req, file, cb) {
    // Allow only .doc and .docx file extensions
    const allowedExtensions = ['.doc', '.docx'];
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(extname)) {
        // If extension is allowed, accept the file
        cb(null, true);
    } else {
        // If extension is not allowed, reject the file
        cb(new Error('Only .doc and .docx files are allowed'));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single("document");
const handleTemplatePost = async(req, res)=>{
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
          if (!body || !body.documentName) {
            return res.status(400).json({msg: "All fields are required..."});
          }
    
          const filename = req.file ? req.file.filename : null;
    
          // Create user record
          const result = await TemplateModal.create({
            documentName: body.documentName,
            document: filename,
          });
    
          return res.status(201).json({msg: "Success", data: result});
        });

    }catch (error){
        console.log("Error:", error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }


  }

  const handleOnetemplateGet = async(req,res)=>{

    const id = req.query.id;
    const token_ = req.query.token;
    try {
        
        const token = await getToken(token_);
        if(!token.status){
            return res.status(401).json({ msg: "Unauthorized" });
        }else{
           const data = await TemplateModal.find({_id:id});
           if (data && data.length > 0) {
            return res.status(200).json({ status: true, msg: "Data found successfully.", data: data });
        } else {
            return res.status(404).json({ status: false, msg: "Data not found." });
        }

        }
    } catch (error) {
         console.log("Error:", error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }

  }

  module.exports={handleTemplateGet,handleTemplatePost,handleOnetemplateGet};