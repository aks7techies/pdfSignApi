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
             return res.status(200).json({status: true,msg:"Create Image Successfull", data:dataUri})
          }
    } catch (error) {
         console.log("Error:", error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }

}

module.exports={handleImageCreate};