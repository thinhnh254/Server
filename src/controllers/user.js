const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  }

  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User already exist");
  } else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser ? "Reigster successfully!" : "Something went wrong!",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  }

  const response = await User.findOne({ email: email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, ...userData } = response.toObject();
    return res.status(200).json({
      success: true,
      userData,
    });
  } else {
    throw new Error("Something went wrong");
  }
});

// let handleLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//     const isCheckEmail = reg.test(email);
//     if (!email || !password) {
//       return res.status(200).json({
//         status: "ERROR",
//         message: "The input is required",
//       });
//     } else if (!isCheckEmail) {
//       return res.status(200).json({
//         status: "ERROR",
//         message: "The input is email",
//       });
//     }
//     const message = await UserService.handleUserLogin(req.body);
//     return res.status(200).json({ message });
//   } catch (e) {
//     return res.status(404).json({
//       message: e,
//     });
//   }
// };

// let handleCreateNewUser = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword } = req.body;
//     const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//     const isCheckEmail = reg.test(email);
//     if (!email || !name || !password || !confirmPassword) {
//       return res.status(200).json({
//         status: "ERROR",
//         message: "The input is required",
//       });
//     } else if (!isCheckEmail) {
//       return res.status(200).json({
//         status: "ERROR",
//         message: "The input is email",
//       });
//     } else if (password !== confirmPassword) {
//       return res.status(200).json({
//         status: "ERROR",
//         message: "The password is equal confirmPassword",
//       });
//     }
//     let message = await UserService.createNewUser(req.body);
//     return res.status(200).json(message);
//   } catch (e) {
//     return res.status(404).json({
//       message: e,
//     });
//   }
// };

// let handleUpdateUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const data = req.body;
//     if (!userId) {
//       return res.status(200).json({
//         status: "ERR",
//         message: "The userId is required",
//       });
//     }
//     let message = await UserService.updateUserData(userId, data);
//     return res.status(200).json(message);
//   } catch (e) {
//     return res.status(404).json({
//       message: e,
//     });
//   }
// };

// let handleDeleteUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     if (!userId) {
//       return res.status(200).json({
//         status: "ERROR",
//         message: "The userId is required",
//       });
//     }
//     let message = await UserService.deleteUser(userId);
//     return res.status(200).json(message);
//   } catch (e) {
//     return res.status(404).json({
//       message: e,
//     });
//   }
// };

// let handleGetAllUser = async (req, res) => {
//   let users = await UserService.getAllUsers();
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "OK",
//     data: users,
//   });
// };

// let handleGetDetailsUser = async (req, res) => {
//   let id = req.params.id;
//   if (!id) {
//     return res.status(200).json({
//       errCode: 1,
//       errMessage: "Missing required parameters",
//       users: [],
//     });
//   }
//   let message = await UserService.getDetailsUsers(id);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "OK",
//     data: message,
//   });
// };

module.exports = {
  // handleCreateNewUser,
  // handleLogin,
  // handleUpdateUser,
  // handleDeleteUser,
  // handleGetAllUser,
  // handleGetDetailsUser,
  register,
  login,
};
