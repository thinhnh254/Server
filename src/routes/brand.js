const express = require("express");
const router = express.Router();
const Controller = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], Controller.createNewBrand);

router.put("/:brid", [verifyAccessToken, isAdmin], Controller.updateBrand);

router.delete("/:brid", [verifyAccessToken, isAdmin], Controller.deleteBrand);

router.get("/", Controller.getAllBrand);

module.exports = router;
