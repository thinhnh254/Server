const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/login", userController.handleLogin);
router.post("/register", userController.handleCreateNewUser);
router.put("/edit/:id", userController.handleUpdateUser);
router.delete("/delete/:id", authMiddleware, userController.handleDeleteUser);
router.get("/getAll", authMiddleware, userController.handleGetAllUser);
router.get(
  "/getDetails/:id",
  authUserMiddleware,
  userController.handleGetDetailsUser
);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
