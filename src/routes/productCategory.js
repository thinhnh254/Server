const express = require("express");
const router = express.Router();
const userController = require("../controllers/productCategory");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], userController.createCategory);

router.put(
  "/:pcid",
  [verifyAccessToken, isAdmin],
  userController.updateCategory
);

router.delete(
  "/:pcid",
  [verifyAccessToken, isAdmin],
  userController.deleteCategory
);

router.get("/", userController.getAllCategory);

module.exports = router;
