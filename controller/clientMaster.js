const ClientModal = require('../model/clientMasterModal'); // Adjust the path as needed
const {getToken} = require("../middleware/auth");

const handleGetAllClient = async (req, res) => {
  const token_ = req.query.token;
  
  try {
      const token = await getToken(token_);

      if (!token.status) {
          // Return unauthorized status if token is invalid
          return res.status(401).json({ msg: "Unauthorized" });
      } else {
          const allClients = await ClientModal.find({});
          if (allClients && allClients.length > 0) {
              return res.status(200).json({ status: true, msg: "Data found successfully.", data: allClients });
          } else {
              return res.status(404).json({ status: false, msg: "Data not found." });
          }
      }
  } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}


const handlePostAddClient = async (req, resp) => {
  const { name, email, token } = req.body;

  try {
      const token_ = await getToken(token);

      if (!token_.status) {
          // Return unauthorized status if token is invalid
          return resp.status(401).json({ msg: "Unauthorized" });
      } else {
          if (name && email) {
              const result = await ClientModal.create({
                  name: name,
                  email: email
              });
              return resp.status(201).json({ msg: "Success", data: result });
          } else {
              return resp.status(400).json({ msg: "Missing or invalid data." });
          }
      }
  } catch (error) {
      // Handle internal server errors
      console.error(error);
      return resp.status(500).json({ msg: "Internal Server Error" });
  }
}


module.exports ={handleGetAllClient,handlePostAddClient};