const mongoose = require('mongoose');
// Define your schema using mongoose.Schema, not db.mongoose.Schema
const schemaLogin =  new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // corrected typo from unqiue to unique
    },
    password: {
        type: String,
        required: true,
    }
});

// Create a model from the schema
const LoginModel = mongoose.model('LoginModel', schemaLogin);

module.exports = LoginModel;
