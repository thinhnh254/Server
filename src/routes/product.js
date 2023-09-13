const express = require("express");
const router = express.Router();
const userController = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], userController.createProduct);

module.exports = router;
