const UserRouter = require("./user");
const ProductRouter = require("./ProductRouter");
const { errHandler, notFound } = require("../middleware/errHandler");

const routes = (app) => {
  app.use("/user", UserRouter);
  app.use("/product", ProductRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = routes;
