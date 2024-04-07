const { SignUpModel } = require('../model/signUpmodal'); // Corrected import statement
const { setToken } = require('../middleware/auth'); // Corrected import statement, and function name changed to camelCase
const bcrypt = require('bcrypt');
const multer = require('multer');
const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = await SignUpModel.findOne({ username });
        if (!user) {
            // User not found
            return res.status(404).json({ error: "Invalid Username or Password" }); // Corrected error message
        }

        // Compare hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            // Passwords don't match
            return res.status(401).json({ error: "Invalid Username or Password" });
        }

        // Generate token
        const token = await setToken(user); // Corrected variable name
        // console.log(token);

        // Successful login
        return res.status(200).json({ msg: "User Logged In",data:{user}, token:token });
    } catch (error) {
        // Handle errors
        console.error("Error in handleLogin:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'); // Destination folder where files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // File naming strategy
    }
  });
const upload = multer({ storage: storage }).single('photoName'); 

const handlePostSignUp = async (req, res) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error("Multer Error:", err);
        return res.status(500).json({ msg: "File upload failed" });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error("Unknown Error:", err);
        return res.status(500).json({ msg: "File upload failed" });
      }
  
      // File upload successful, continue with user registration
      const { name, username, password } = req.body;
      const encryptPassword = await bcrypt.hash(password, 10);
  
      try {
        const doc = await SignUpModel.findOne({ username: username });
        if (!doc) {
          // Get the filename of the uploaded file
          const filename = req.file ? req.file.filename : null;
  
          // Create a new user with file name and other details
          await SignUpModel.create({ name: name, username: username, password: encryptPassword, photoName: filename });
  
          return res.status(201).json({ status: true, msg: "Registration Successful" });
        } else {
          console.log('User Already Exists');
          return res.status(400).json({ status: "Username already exists" });
        }
      } catch (error) {
        console.error("Error in handlePostSignUp:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
      }
    });
  };

const handlePatchUser = async (req, res, next) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error("Multer Error:", err);
        return res.status(500).json({ msg: "File upload failed" });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error("Unknown Error:", err);
        return res.status(500).json({ msg: "File upload failed" });
      }
  
      // File upload successful, continue with user update
      const { _id, name, username, password } = req.body;
      const encryptPassword = await bcrypt.hash(password, 10);
  
      try {
        // Find the user by ID
        const user = await SignUpModel.findById( _id);
  
        // Check if user exists
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }
  
        // Update user fields
        if (name) {
          user.name = name;
        }
        if (username) {
          user.username = username;
        }
        if (password) {
          user.password = encryptPassword;
        }
        if (req.file) {
          user.photoName = req.file.filename;
        }
  
        // Save the updated user
        await user.save();
  
        return res.status(200).json({ status: true, msg: "User updated successfully" });
      } catch (error) {
        console.error("Error in handlePatchUser:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
      }
    });
  };

module.exports = { handleLogin, handlePostSignUp, handlePatchUser };
