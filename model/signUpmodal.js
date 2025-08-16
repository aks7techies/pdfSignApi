const mongoose = require('mongoose');

const schemaSignUp = new mongoose.Schema({
<<<<<<< HEAD
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photoName:{
        type:String,
      
    }
=======
    name:String,
    username:String,
    password:String,
    photoName:String
>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
},{timestamps:true}
);

const SignUpModel = mongoose.model('SignUpModel', schemaSignUp);

module.exports = {SignUpModel};
