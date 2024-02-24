const jwt = require("jsonwebtoken");
const secretKey = "Aks67565@#76nkjhgnknh@.kjh"; // Corrected variable name

const setToken = async (user) => {
    if (!user) return { status: false, msg: "Invalid User" }; 
    try {
        const token = jwt.sign(
            { _id: user._id, username: user.username },
            secretKey
        );
        return { status: true, token }; // Included status as true and returned token
    } catch (error) {
        return { status: false, msg: error.message }; // Accessed error message property for clearer error messages
    }
};

const getToken = (token) => {
    if (!token) return { status: false, msg: "Invalid token" }; // Included status as false
    try {
        const decoded = jwt.verify(token, secretKey);
        return { status: true, decoded }; // Included status as true and returned decoded token
    } catch (error) {
        return { status: false, msg: error.message }; // Accessed error message property for clearer error messages
    }
};

module.exports = {
    setToken, // Corrected function name to camelCase
    getToken, // Corrected function name to camelCase
};
