const userRouter = require("./user");
const brandRouter = require("./brand");
const blogRouter = require("./blog");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const { errHandler, notFound } = require("../middleware/errHandler");

const routes = (app) => {
  app.use("/user", userRouter);
  app.use("/brand", brandRouter);
  app.use("/product", productRouter);
  app.use("/productcategory", productCategoryRouter);
  app.use("/blog", blogRouter);
  app.use("/blogcategory", blogCategoryRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = routes;
