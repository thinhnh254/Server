const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body) === 0) {
    throw new Error("Missing input");
  }

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const newProduct = await Product.create(req.body);

  return res.status(200).json({
    success: newProduct ? true : false,
    createdProductStatus: newProduct
      ? newProduct
      : "Can not create new product!",
  });
});

module.exports = {
  createProduct,
};
