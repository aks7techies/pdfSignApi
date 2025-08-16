
const HistoryModal = require('../model/historyDataModal');
 const {getToken} = require('../middleware/auth');

 const handleAllGetHistory = async(req, res) =>{
       
    try {
        const token = await getToken(req.query.token);
        if(!token.status){
            return res.status(401).json({ msg: "Unauthorized" });
        }else{
            const result = await HistoryModal.find({clientId:req.query.clientId,draftId:req.query.draftId});
           if(result && result.length > 0){
            return res.status(200).json({ status: true, msg: "Data found successfully.", data: result });
        }else {
             return res.status(200).json({ status: true, msg: "Data not found.", data: []});
           }
        }

    } catch (error) {
        console.log("Error:", error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
 };


 const handlePostHistory = async (req, res)=>{
   const body = req.body;
   try {
      const token  = await getToken(body.token);
      if(!token.status){
        return res.status(401).json({ msg: "Unauthorized" });
    }else{
         const result = await HistoryModal.create({
            clientId:body.clientId,
            draftId:body.draftId,
            Activity:body.Activity,
            discription: body.discription
         });

        if(result){
           return res.status(201).json({status: true,msg:"Success", data: result}); 
        }
    }
   } catch (error) {
     console.log("Error:", error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
   }
 }

 module.exports ={
    handleAllGetHistory,
    handlePostHistory
 };
