<<<<<<< HEAD
const fs = require('fs');
const text2png = require('text2png');

const handleImageCreate = async(req, res)=>{
    try {
        
        if (req.query.textContent!=='') {
       const dataUri =   text2png(req.query.textContent, { 
        // font: 'italic 20px "Dancing Script", cursive',
        font: 'italic 20px "Dancing Script", cursive',
        color: 'teal',
        output:'dataURL',
        backgroundColor: 'transparent',
        lineSpacing: 10,
        padding: 20});
=======
// const {getToken} = require("../middleware/auth");
const textToImage = require('text-to-image');
const handleImageCreate = async(req, res)=>{
    try {
        // const token  = await getToken(req.body.token);
        if (req.query.textContent!=='') {
        //     // Return unauthorized status if token is invalid
        //     return res.status(401).json({ msg: "Unauthorized" });
        //   }else{
            const dataUri = await textToImage.generate(req.query.textContent, {
                debug: true,
                maxWidth: 140,
                fontSize: 15,
                fontFamily: 'Arial',
                lineHeight: 20,
                margin: 5,
                // bgColor: '#ffff',
                textColor: '#000',
              });   

>>>>>>> 853b2a6f459e59f934a9f9253831f69e97df1ab7
             return res.status(200).json({status: true,msg:"Create Image Successfull", data:dataUri})
          }
    } catch (error) {
         console.log("Error:", error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }

}

module.exports={handleImageCreate};