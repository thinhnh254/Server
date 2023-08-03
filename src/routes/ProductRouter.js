const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create", ProductController.handleCreateProduct);
router.put("/edit/:id", authMiddleware, ProductController.handleEditProduct);
router.get("/getDetails/:id", ProductController.handleGetDetailsProduct);
router.delete(
  "/delete/:id",
  authMiddleware,
  ProductController.handleDeleteProduct
);
router.get("/getAll", ProductController.handleGetAllProduct);

module.exports = router;
