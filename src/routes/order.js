const express = require("express");
const router = express.Router();
const Controller = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], Controller.createOrder);

module.exports = router;
