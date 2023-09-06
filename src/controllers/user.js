const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
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

const refreshAccessToken = asyncHandler(async (req, res) => {
  //get token from cookies
  const cookie = req.cookies;

  //check have token?
  if (!cookie && !cookie.refreshToken) {
    throw new Error("No have refresh token in cookies");
  }

  //check token is valid?
  const results = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);

  const response = await User.findOne({
    _id: results._id,
    refreshToken: cookie.refreshToken,
  });

  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh Token",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie || !cookie.refreshToken) {
    throw new Error("Not have refresh Token in cookie");
  }

  //remove rf on db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );

  //remove rf in cookie
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });

  return res.status(200).json({
    success: true,
    message: "Logout done",
  });
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
};
