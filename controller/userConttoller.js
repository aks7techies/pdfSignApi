const User = require("../model/userdetail");

const handleGetAllUser = async(req, res)=>{
    const allDbusers = await User.find({});
    return res.json(allDbusers);
}
const handleGetUserById = async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json({user});
}
const handleUpdateUserById = async(req, res)=>{
    await User.findByIdAndUpdate(req.params.id, {name:req.body.name });
    return res.json({status: "Success"});
}
const handleDeleteUserById = async(req, res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"});
}
const handleCreateUserById = async(req, res)=>{
    const body = req.body;
    if(!body || !body.name ){
        return res.status(400).json({msg: "All field are required..."});

    }
    const result  = await User.create({name:body.name});
    return res.status(201).json({msg:"Success", data:result });
}


module.exports = {
    handleGetAllUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUserById
}