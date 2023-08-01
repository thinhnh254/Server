const UserService = require("../services/UserService");

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing Input params",
    });
  }

  let userData = await UserService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    token: userData.token,
    refreshtoken: userData.rftoken,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await UserService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleUpdateUser = async (req, res) => {
  // try {
  //   const userId = req.params.id;
  //   let data = req.body;
  //   if (!userId) {
  //     return res.status(200).json({
  //       status: "ERR",
  //       message: "The userId is required",
  //     });
  //   }
  //   let message = await UserService.updateUserData(userId, data);
  //   return res.status(200).json(message);
  // } catch (e) {
  //   return res.status(500).json({
  //     message: e,
  //   });
  // }
};

module.exports = {
  handleCreateNewUser,
  handleLogin,
  handleUpdateUser,
};
