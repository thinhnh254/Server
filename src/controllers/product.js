const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const product = require("../models/product");

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

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);

  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Can not get product!",
  });
});

const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();

  return res.status(200).json({
    success: products ? true : false,
    productData: products ? products : "Can not get all product!",
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProductStatus: updatedProduct
      ? updatedProduct
      : "Can not update product!",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);

  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProductStatus: deletedProduct
      ? "Success"
      : "Can not delete product!",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
