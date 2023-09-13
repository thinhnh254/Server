const UserRouter = require("./user");
const { errHandler, notFound } = require("../middleware/errHandler");

const routes = (app) => {
  app.use("/user", UserRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = routes;
