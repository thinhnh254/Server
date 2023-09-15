const express = require("express");
const router = express.Router();
const userController = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], userController.createBlog);

router.put("/:bid", [verifyAccessToken, isAdmin], userController.updateBlog);

router.get("/", userController.getBlogs);

router.delete("/:bid", [verifyAccessToken, isAdmin], userController.deleteBlog);

module.exports = router;
