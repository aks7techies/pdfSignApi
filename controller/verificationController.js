<<<<<<< HEAD
const VerificationModal = require("../model/verificationDataModal");
const {getToken} = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const  ObjectId  = mongoose.Types.ObjectId;
const {uploadSignFileToS3} = require("./uploadS3File");
const handleGetAllVerification = async (req, res) => {
  try {
    const token_ = await getToken(req.query.token);
    if (!token_.status) {
      return res.status(401).json({msg: "Unauthorized"});
    } else {
      const verifica = await VerificationModal.find({clientId: req.query.clientId, isVerification:0, stage:0 });
      if (verifica && verifica.length > 0) {
        return res.status(200).json({
          status: true,
          msg: "Data found successfully.",
          data: verifica,
        });
      } else {
        return res.status(200).json({status: false, msg: "Data not found.", data:[]});
      }
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({status: false, msg: "Internal Server Error"});
  }
};

const handleGetSingledata = async (req, res) => {
  try {
     const token = await getToken(req.query.token);
    if (!token.status) {
        return res.status(401).json({status: false, msg: "Unauthorized"});
    } else {
          const result = await VerificationModal.findOne({draftId: req.query.draftId});
          if(result){
            res.status(200).json({status: true, msg:"Record Found Successfully.", data: result});
          }else{
            res.status(200).json({status: false, msg:"Record Not Found Successfully.", data: []});
          }
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({status: false, msg: "Internal Server Error"});
  }
};

const handlePostVerification = async (req, res) => {
  const fileNameSign = `image_${Date.now()}.png`;
  const signpdfFile = `pdf_${Date.now()}.pdf`;

  try {
    const body = req.body;
    // console.log(body.token);
    const token = await getToken(body.token);
    if (!token.status) {
      return res.status(401).json({status: false, msg: "Unauthorized"});
    } else {
      const buffer = Buffer.from(body.Signature.split(",")[1], "base64");
      const bufferFile = Buffer.from(
        body.pdfSignerFile.split(",")[1],
        "base64"
      );

      const imagePath = path.join(
        "./uploads/verificationDetails/",
        fileNameSign
      );
      fs.writeFile(imagePath, buffer, "base64", (err) => {
        if (err) {
          console.error("Error saving image:", err);
          return res
            .status(500)
            .json({status: false, msg: "Error saving image"});
        }

        // Save the PDF to a file
        const pdfPath = path.join(
          "./uploads/verificationDetails/",
          signpdfFile
        );
        fs.writeFile(pdfPath, bufferFile, "base64", (err) => {
          if (err) {
            console.error("Error saving PDF:", err);
            return res
              .status(500)
              .json({status: false, msg: "Error saving PDF"});
          }

          // Upload files to S3
          Promise.all([
            uploadSignFileToS3(`./uploads/verificationDetails/${fileNameSign}`),
            uploadSignFileToS3(`./uploads/verificationDetails/${signpdfFile}`),
          ])
            .then(([urlnameSignature, urlnamepdfSignerFile]) => {
              if (urlnameSignature && urlnamepdfSignerFile) {
                // Create entry in MongoDB
                VerificationModal.create({
                  clientId: body.clientId,
                  draftId: body.draftId,
                  coordinate: body.textFiled,
                  dateFiled: body.dateFiled,
                  Singer_date: body.Singer_date,
                  photoFile: body.photoFile,
                  Signature: urlnameSignature,
                  pdfSignerFile: urlnamepdfSignerFile,
                })
                  .then((result) => {
                    // Return success response
                    return res.status(201).json({
                      status: true,
                      msg: "Insert Data Successfully.",
                      data: result,
                    });
                  })
                  .catch((error) => {
                    console.error("Error creating MongoDB entry:", error);
                    return res.status(500).json({
                      status: false,
                      msg: "Error creating MongoDB entry",
                    });
                  });
              } else {
                return res
                  .status(500)
                  .json({status: false, msg: "Failed to upload files to S3"});
              }
            })
            .catch((error) => {
              console.error("Error uploading files to S3:", error);
              return res
                .status(500)
                .json({status: false, msg: "Error uploading files to S3"});
            });
        });
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({status: false, msg: "Internal Server Error"});
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
  const allowedExtensions = [".pdf"];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(extname)) {
    // If extension is allowed, accept the file
    cb(null, true);
  } else {
    // If extension is not allowed, reject the file
    cb(new Error("Only .pdf file are allowed"));
  }
};

const upload = multer({storage: storage, fileFilter: fileFilter}).single(
  "pdfSignerFile"
);

const handleGetAllArchiveData = async (req, res) => {
  
  try {
   
      const token = await getToken(req.query.token);
      if (!token.status) {
        return res.status(401).json({msg: "Unauthorized"});
      } else {
        const clientId = new ObjectId(req.query.clientId);
        const Result = await VerificationModal.aggregate([
          {
            "$lookup": {
              "from": "userinsertmodals",
              "localField": "draftId",
              "foreignField": "_id",
              "as": "userinsertmodals"
            }
          },
          {
            "$match": {
              "isVerification": 1,
              "clientId":clientId,
              "stage":1,
              "userinsertmodals.stage": 2
            }
          }
        ]);
        if (Result && Result.length > 0) {
          return res
            .status(200)
            .json({
              status: true,
              msg: "Data found successfully.",
              data: Result});
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
};
const handleUpdateButtonVerification = async (req, res) => {
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
        isVerificationDate:dataObj.isVerificationDate,
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

module.exports = {
  handleGetAllVerification,
  handlePostVerification,
  handleGetSingledata,
  handleGetAllArchiveData,
  handleUpdateButtonVerification,
};
=======
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

>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
