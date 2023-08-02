const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/login", userController.handleLogin);
router.post("/register", userController.handleCreateNewUser);
router.put("/update-user/:id", userController.handleUpdateUser);
router.delete(
  "/delete-user/:id",
  authMiddleware,
  userController.handleDeleteUser
);
router.get("/getAll", authMiddleware, userController.handleGetAllUser);
router.get(
  "/getDetails/:id",
  authMiddleware,
  userController.handleGetDetailsUser
);

module.exports = router;
