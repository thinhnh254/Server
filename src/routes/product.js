const express = require("express");
const router = express.Router();
const userController = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.get("/", userController.getAllProduct);

router.get("/:pid", userController.getProduct);

router.put("/ratings", verifyAccessToken, userController.ratings);

router.post("/", [verifyAccessToken, isAdmin], userController.createProduct);

router.put("/:pid", [verifyAccessToken, isAdmin], userController.updateProduct);

router.delete(
  "/:pid",
  [verifyAccessToken, isAdmin],
  userController.deleteProduct
);

module.exports = router;
