const Order = require("../models/order");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const userCart = await User.findById(_id).select("cart");

  return res.status(200).json({
    success: userCart ? true : false,
    createdBlogStatus: userCart ? userCart : "Can not create new blog!",
  });
});

module.exports = {
  createOrder,
};
