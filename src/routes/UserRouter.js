const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/login", userController.handleLogin);
router.post("/register", userController.handleCreateNewUser);

module.exports = router;
