const VerificationModal = require('../model/verificationDataModal');
const {getToken} = require("../middleware/auth");
const multer = require("multer");
const path = require('path');
const handleGetAllVerification = async(req, res)=>{

    try {
        
        const token_ = await getToken(req.params.token);
        if(!token_.status){
            return res.status(401).json({ msg: "Unauthorized" });
        }else{
            const verifica = await VerificationModal.find({});
            if(verifica && verifica.length >0){
                return res.status(200).json({ status: true, msg: "Data found successfully.", data: verifica });
          } else {
              return res.status(404).json({ status: false, msg: "Data not found." });
          }
        }
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};


const handlePostVerification = async(req, res)=>{

    const body = req.body;
      try {
        const token = await getToken(body.token);
        if(!token.status){
            return res.status(401).json({ msg: "Unauthorized" });
        }else{
            
            const result = await VerificationModal.create({
             
                clientId:body.clientId,
                draftId:body.draftId,
                photoFile:body.photoFile,
                Signature:body.Signature

            });
            return res.status(201).json({msg: "Success", data: result});

        }
      } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
      }

};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/verificationDetails/"); // Destination folder where files will be stored
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

const upload = multer({ storage: storage, fileFilter: fileFilter }).single("pdfSignerFile");
const handleUpdateVerification = async(req, res)=>{

    const dataObj  = req.body;
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
        const token = await getToken(dataObj.token);
        if(!token.status){
            return res.status(401).json({ msg: "Unauthorized" });
        }else{
            const id  = req.params.id;
            const filename = req.file ? req.file.filename : null;
            const updateResult = await VerificationModal.findByIdAndUpdate(id,{pdfSignerFile:filename});
                 if(updateResult){
                    return res.status(201).json({msg: "Update Success", data: updateResult});
                 }else{
                    return res.status(404).json({ status: false, msg: "Update Not Success." });
                 }
        }
    });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    } 

}
const handleUpdateButtonVerification = async(req, res)=>{

    const dataObj  = req.body;
    try {
        const token = await getToken(dataObj.token);
        if(!token.status){
            return res.status(401).json({ msg: "Unauthorized" });
        }else{
            const id  = req.params.id;
            const updateResult = await VerificationModal.findByIdAndUpdate(id,{isVerification:dataObj.isVerification});
                 if(updateResult){
                    return res.status(201).json({msg: "Update Success", data: updateResult});
                 }else{
                    return res.status(404).json({ status: false, msg: "Update Not Success." });
                 }
        }

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    } 

}

module.exports ={
    handleGetAllVerification,
    handlePostVerification,
    handleUpdateVerification,
    handleUpdateButtonVerification
}

