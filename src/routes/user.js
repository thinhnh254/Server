const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// router.post("/login", userController.handleLogin);
router.post("/register", userController.register);
// router.put("/edit/:id", userController.handleUpdateUser);
// router.delete("/delete/:id", userController.handleDeleteUser);
// router.get("/getAll", userController.handleGetAllUser);
// router.get("/getDetails/:id", userController.handleGetDetailsUser);

module.exports = router;
