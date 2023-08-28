const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/jwt");

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
    const accessToken = generateAccessToken(response._id, role);
    const refreshToken = generateRefreshToken(response._id);

    // Save RT to DB
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });

    // Save RT to cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Something went wrong");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const _id = req.user;

  const user = await User.findById(_id).select("-password -role -refreshToken");

  return res.status(200).json({
    success: false,
    response: user ? user : "User not found",
  });
});

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
  // handleUpdateUser,
  // handleDeleteUser,
  // handleGetAllUser,
  // handleGetDetailsUser,
  register,
  login,
  getCurrent,
};
