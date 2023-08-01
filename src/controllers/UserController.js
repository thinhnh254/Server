const UserService = require("../services/UserService");

let handleCreateNewUser = async (req, res) => {
  let message = await UserService.createNewUser(req.body);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewUser,
};
