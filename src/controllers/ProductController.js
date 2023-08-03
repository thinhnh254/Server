const ProductService = require("../services/ProductService");

let handleCreateProduct = async (req, res) => {
  let { name, image, type, price, countInStock, rating, description } =
    req.body;

  if (!name || !image || !type || !price || !countInStock || !rating) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing Input params",
    });
  }

  let message = await ProductService.createProduct(req.body);

  return res.status(200).json({ message });
};

let handleEditProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The product id is required",
      });
    }
    const message = await ProductService.editProduct(productId, data);
    return res.status(200).json({ message });
  } catch (e) {
    return res.status(500).json({
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
  let products = await ProductService.getAllProducts();
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    data: products,
  });
}


module.exports = {
  handleCreateProduct,
  handleEditProduct,
  handleGetDetailsProduct,
  handleDeleteProduct,
  handleGetAllProduct,
};
