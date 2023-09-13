const userRouter = require("./user");
const productRouter = require("./product");
const { errHandler, notFound } = require("../middleware/errHandler");

const routes = (app) => {
  app.use("/user", userRouter);
  app.use("/product", productRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = routes;
