const express = require("express");
const router = express.Router();
const userController = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.put("/like/:bid", verifyAccessToken, userController.likeBlog);

router.put("/dislike/:bid", verifyAccessToken, userController.dislikeBlog);

router.post("/", [verifyAccessToken, isAdmin], userController.createBlog);

router.put("/:bid", [verifyAccessToken, isAdmin], userController.updateBlog);

router.get("/all", userController.getBlogs);

router.get("/one/:bid", userController.getBlog);

router.delete("/:bid", [verifyAccessToken, isAdmin], userController.deleteBlog);

module.exports = router;
