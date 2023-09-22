const express = require("express");
const router = express.Router();
const Controller = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");
const uploader = require("../config/cloudinary.config");

router.get("/", Controller.getAllProduct);

router.get("/:pid", Controller.getProduct);

router.put("/ratings", verifyAccessToken, Controller.ratings);

router.post("/", [verifyAccessToken, isAdmin], Controller.createProduct);

router.put("/:pid", [verifyAccessToken, isAdmin], Controller.updateProduct);

router.put(
  "/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 10), // Use "images" as the field name
  Controller.uploadImagesProduct
);

router.delete("/:pid", [verifyAccessToken, isAdmin], Controller.deleteProduct);

module.exports = router;
