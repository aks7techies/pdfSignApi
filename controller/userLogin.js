const { SignUpModel } = require('../model/signUpmodal'); // Corrected import statement
const { setToken } = require('../middleware/auth'); // Corrected import statement, and function name changed to camelCase
const bcrypt = require('bcrypt');
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
        return res.status(200).json({ msg: "User Logged In",data:{username}, token:token });
    } catch (error) {
        // Handle errors
        console.error("Error in handleLogin:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const handlePostSignUp = async (req, res) => {
    const { name, username, password } = req.body;
     const encryptPassword = await bcrypt.hash(password,10);
    // console.log({ name, username, password });
    try {
      const doc = await SignUpModel.findOne({username:username});
      if(!doc){
        await SignUpModel.create({name: name, username:username, password:encryptPassword }); // Use the imported model
        // res.send({status:true, msg: "Registration Successful" });
        return res.status(201).json({status:true, msg: "Registration Successful" });
      }else{
        console.log('User Allready Exist');
        res.json({ status: "Email Allready Exist" });
      }
    } catch (error) {
        console.error("Error in handlePostSignUp:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};


module.exports = { handleLogin, handlePostSignUp };
