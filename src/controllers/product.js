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

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);

  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Can not get product!",
  });
});

const getAllProduct = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  //Filtering
  if (queries?.title) {
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  }

  let queryCommand = Product.find(formatedQueries);

  // queryCommand.exec(async (err, response) => {
  //   if (err) {
  //     throw new Error(err.message);
  //   }
  //   const counts = await Product.find(formatedQueries).countDocuments();
  //   return res.status(200).json({
  //     success: response ? true : false,
  //     products: response ? response : "Can not get all product!",
  //     counts,
  //   });
  // });
  try {
    const response = await queryCommand.exec();
    const counts = await Product.find(formatedQueries).countDocuments();

    return res.status(200).json({
      success: response ? true : false,
      products: response ? response : "Can not get all product!",
      counts,
    });
  } catch (err) {
    // Handle any errors that occur during the query or counting
    return res.status(500).json({ success: false, error: err.message });
  }
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
