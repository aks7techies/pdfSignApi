const mongoose = require('mongoose');

const schemaSignUp = new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    photoName:String
},{timestamps:true}
);

const SignUpModel = mongoose.model('SignUpModel', schemaSignUp);

module.exports = {SignUpModel};
