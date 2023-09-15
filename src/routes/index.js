const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const { errHandler, notFound } = require("../middleware/errHandler");

const routes = (app) => {
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("/productcategory", productCategoryRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = routes;
