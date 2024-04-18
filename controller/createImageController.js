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

             return res.status(200).json({status: true,msg:"Create Image Successfull", data:dataUri})
          }
    } catch (error) {
         console.log("Error:", error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }

}

module.exports={handleImageCreate};