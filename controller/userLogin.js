const { LoginModel } = require("../model/loginmodal");
const { SignUpModel } = require('../model/signUpmodal'); // Corrected import statement
const { setToken } = require('../middleware/auth'); // Corrected import statement, and function name changed to camelCase

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await LoginModel.findOne({ username, password });
        if (!user) {
            return res.status(404).json({ msg: "Invalid Username or Password" }); // Corrected error message
        }
        const token = setToken(user); // Corrected variable name
        return res.status(200).json({ msg: "User Logged In", data: token }); // Changed status code to 200 for successful login
    } catch (error) {
        console.error("Error in handleLogin:", error); // Added error handling
        return res.status(500).json({ msg: "Internal Server Error" }); // Added error response for internal server errors
    }
};

const handlePostSignUp = async (req, res) => {
    const { name, username, password } = req.body;
    console.log(req.body);
    try {
        await SignUpModel.create({ name, username, password }); // Use the imported model
        return res.status(201).json({ msg: "Registration Successful" });
    } catch (error) {
        console.error("Error in handlePostSignUp:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};


module.exports = { handleLogin, handlePostSignUp };
