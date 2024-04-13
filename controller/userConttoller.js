const UserInsertModal = require("../model/draftDataProcessModal"); // Adjust the path as needed
const {getToken} = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const handleGetAllUser = async (req, res) => {
  try {
    const token_ = getToken(req.query.token);

    if (!token_.status) {
      return res.status(401).json({msg: "Unauthorized"});
    } else {
      //  console.log(req.query.clientId);
      const allDbusers = await UserInsertModal.find({
        clientId: req.query.clientId,
        stage: 0,
      });
      if (allDbusers && allDbusers.length > 0) {
        return res.status(200).json({
          status: true,
          msg: "Data found successfully.",
          data: allDbusers,
        });
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


const handleGetUserById = async (req, res) => {
  try {
    const token_ = getToken(req.body.token);
    if (!token_.status) {
      return res.status(401).json({msg: "Unauthorized"});
    } else {
      const user = await UserInsertModal.findById(req.params.id);
      if (user && user.length > 0) {
        return res
          .status(200)
          .json({status: true, msg: "Data found successfully.", data: user});
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
const handleUpdateUserById = async (req, res) => {
  try {
    const token_ = getToken(req.body.token);
    if (!token_.status) {
      return res.status(401).json({msg: "Unauthorized"});
    } else {
      const user = await UserInsertModal.findByIdAndUpdate(req.body.id, {
        stage: req.body.stage,
      });
      if (user) {
        return res
          .status(200)
          .json({status: true, msg: "Data Update successfully.", data: user});
      } else {
        return res.status(400).json({status: false, msg: "Data not Update."});
      }
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({status: false, msg: "Internal Server Error"});
  }
};
const handleDeleteUserById = async (req, res) => {
  try {
    const token = await getToken(req.query.token);
    if (!token.status) {
      return res.status(401).json({msg: "Unauthorized"});
    } else {
      await UserInsertModal.findByIdAndDelete(req.query.id);
      return res.status(200).json({status: "Delete Success"});
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({status: false, msg: "Internal Server Error"});
  }
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
  "originalFileName"
);
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
        return res.status(401).json({msg: "Unauthorized"});
      }
      if (
        !body ||
        !body.clientId ||
        !body.draftDocumentName ||
        !body.dateTimeOriginal
      ) {
        return res.status(400).json({msg: "All fields are required..."});
      }

      const filename = req.file ? req.file.filename : null;

      // Create user record
      const result = await UserInsertModal.create({
        clientId: body.clientId,
        draftDocumentName: body.draftDocumentName,
        originalFileName: filename,
        dateTimeOriginal: body.dateTimeOriginal,
      });
      const insertedId = result._id; // Get the inserted ID
      return res.status(201).json({msg: "Success", data: result, insertedId: insertedId});
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
  handleCreateUserById
};
