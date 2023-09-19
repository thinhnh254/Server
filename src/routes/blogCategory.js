const express = require("express");
const router = express.Router();
const Controller = require("../controllers/blogCategory");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], Controller.createCategory);

router.put("/:bcid", [verifyAccessToken, isAdmin], Controller.updateCategory);

router.delete(
  "/:bcid",
  [verifyAccessToken, isAdmin],
  Controller.deleteCategory
);

router.get("/", Controller.getAllCategory);

module.exports = router;
