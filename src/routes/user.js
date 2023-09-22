const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.post("/register", Controller.register);

router.post("/login", Controller.login);

router.get("/current", verifyAccessToken, Controller.getCurrent);

router.put("/update", verifyAccessToken, Controller.updateUser);

router.post("/refreshtoken", Controller.refreshAccessToken);

router.get("/logout", Controller.logout);

router.get("/forgotpassword", Controller.forgotPassword);

router.put("/resetpassword", Controller.resetPassword);

router.get("/", [verifyAccessToken, isAdmin], Controller.getAllUsers);

router.delete("/", [verifyAccessToken, isAdmin], Controller.deleteUser);

router.put("/address", verifyAccessToken, Controller.updateUserAddress);

router.put("/cart", verifyAccessToken, Controller.updateCart);

router.put("/:uid", [verifyAccessToken, isAdmin], Controller.updateUserByAdmin);

module.exports = router;
