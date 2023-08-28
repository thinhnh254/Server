const ProductService = require("../services/ProductService");

let handleCreateProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      countInStock,
      price,
      rating,
      description,
      discount,
    } = req.body;
    if (
      !name ||
      !image ||
      !type ||
      !countInStock ||
      !price ||
      !rating ||
      !discount
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

let handleEditProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

let handleGetDetailsProduct = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      product: [],
    });
  }
  let message = await ProductService.getDetailsProduct(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    data: message,
  });
};

let handleDeleteProduct = async (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await ProductService.deleteProduct(req.params.id);
  return res.status(200).json(message);
};

let handleGetAllProduct = async (req, res) => {
  const { limit, page, sort } = req.body;
  let products = await ProductService.getAllProducts(
    Number(limit) || 8,
    Number(page) || 0,
    sort
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    data: products,
  });
};

module.exports = {
  handleCreateProduct,
  handleEditProduct,
  handleGetDetailsProduct,
  handleDeleteProduct,
  handleGetAllProduct,
};
