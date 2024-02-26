const User = require("../model/userdetail");
const { getToken } = require("../middleware/auth");

const handleGetAllUser = async (req, res) => {
  const allDbusers = await User.find({});
  return res.json(allDbusers);
};
const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json({ user });
};
const handleUpdateUserById = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { name: req.body.name });
  return res.json({ status: "Success" });
};
const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
};
const handleCreateUserById = async (req, res) => {
  try {
    const body = req.body;
    const token = await getToken(body.token);
    if (token) {
      if (
        !body ||
        !body.name ||
        !body.email ||
        !body.documentName ||
        !body.originalFileName
      ) {
        return res.status(400).json({ msg: "All field are required..." });
      }
      const result = await User.create({
        name: body.name,
        email: body.email,
        documentName: body.documentName,
        originalFileName: body.originalFileName,
      });
      return res.status(201).json({ msg: "Success", data: result });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server error "});
  }
};

module.exports = {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUserById,
};
