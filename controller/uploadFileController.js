const path = require("path");
const multer = require("multer");
const fs = require("fs");
const fileType = require('file-type');
const fsp = require("fs/promises");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/images/"); // Destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // File naming strategy
  },
});
const fileFilter = function (req, file, cb) {
  // Allow only .doc and .docx file extensions
  const allowedExtensions = [".jpeg", ".jpg", ".png"];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(extname)) {
    // If extension is allowed, accept the file
    cb(null, true);
  } else {
    // If extension is not allowed, reject the file
    cb(new Error("Only .jpeg and .jpg, .png files are allowed"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "file"
);

const uploadFile = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError || err) {
      console.error("Upload Error:", err);
      return res.status(500).json({ msg: "File upload failed" });
    }

    try {
      const fileBuffer = await fsp.readFile(req.file.path);
      const type = await fileType.fromBuffer(fileBuffer);

      if (!type || !["image/jpeg", "image/png"].includes(type.mime)) {
        // Delete the invalid file
        await fsp.unlink(req.file.path);
        return res
          .status(400)
          .json({ msg: "Uploaded file is not a valid image" });
      }

      // ✅ Only now return the URL
      return res.status(200).json({
        message: "File uploaded successfully",
        filePath: `http://localhost:8000/uploads/images/${req.file.filename}`,
      });
    } catch (readErr) {
      console.error("File validation error:", readErr);
      return res.status(500).json({ msg: "File validation failed" });
    }
  });
};

module.exports = { uploadFile };
