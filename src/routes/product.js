const express = require("express");
const router = express.Router();
const Controller = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.get("/", Controller.getAllProduct);

router.get("/:pid", Controller.getProduct);

router.put("/ratings", verifyAccessToken, Controller.ratings);

router.post("/", [verifyAccessToken, isAdmin], Controller.createProduct);

router.put("/:pid", [verifyAccessToken, isAdmin], Controller.updateProduct);

router.delete("/:pid", [verifyAccessToken, isAdmin], Controller.deleteProduct);

module.exports = router;
