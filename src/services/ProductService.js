const Product = require("../models/ProductModel");

let createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    let { name, image, type, price, countInStock, rating, description } =
      newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "The name of product is already",
        });
      }
      const newProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "Create Success.",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "Product is not defined",
        });
      }

      const updateProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "Edit success!",
        data: updateProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await Product.findOne({
        _id: id,
      });

      if (product === "null") {
        resolve({
          status: "OK",
          message: "Product is not defined",
        });
      }
      resolve({
        product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundProduct = await Product.findOne({
        _id: productId,
      });
      if (!foundProduct) {
        resolve({
          errCode: 2,
          errMessage: "The product isn't exist",
        });
      }

      await Product.findByIdAndRemove(productId);

      resolve({
        errCode: 0,
        message: "The product is delete",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllProducts = (limit, page, sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count();
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        let productSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          data: productSort,
          total: totalProduct,
          page: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      let products = await Product.find()
        .limit(limit)
        .skip(page * limit)
        .sort({ name: sort });
      resolve({
        data: products,
        total: totalProduct,
        page: page + 1,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  editProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProducts,
};
