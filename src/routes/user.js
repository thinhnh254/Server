const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/current", verifyAccessToken, userController.getCurrent);

router.put("/update", verifyAccessToken, userController.updateUser);

router.post("/refreshtoken", userController.refreshAccessToken);

router.get("/logout", userController.logout);

router.get("/forgotpassword", userController.forgotPassword);

router.put("/resetpassword", userController.resetPassword);

router.get("/", [verifyAccessToken, isAdmin], userController.getAllUsers);

router.delete("/", [verifyAccessToken, isAdmin], userController.deleteUser);

router.put(
  "/:uid",
  [verifyAccessToken, isAdmin],
  userController.updateUserByAdmin
);

module.exports = router;
