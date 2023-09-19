const express = require("express");
const router = express.Router();
const userController = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middleware/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], userController.createNewBrand);

router.put("/:brid", [verifyAccessToken, isAdmin], userController.updateBrand);

router.delete(
  "/:brid",
  [verifyAccessToken, isAdmin],
  userController.deleteBrand
);

router.get("/", userController.getAllBrand);

module.exports = router;
