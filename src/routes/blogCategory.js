const express = require("express");
const router = express.Router();
const userController = require("../controllers/blogCategory");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], userController.createCategory);

router.put(
  "/:bcid",
  [verifyAccessToken, isAdmin],
  userController.updateCategory
);

router.delete(
  "/:bcid",
  [verifyAccessToken, isAdmin],
  userController.deleteCategory
);

router.get("/", userController.getAllCategory);

module.exports = router;
