const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(400).json({
        message: "The authenticaion",
        status: "ERROR",
      });
    }
    const { payload } = user;
    if (payload?.isAdmin) {
      next();
    } else {
      return res.status(400).json({
        message: "The authenticaion",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authMiddleware,
};
