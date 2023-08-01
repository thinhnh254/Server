const express = require("express");
const routes = require("./routes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 3515;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect DB success!");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
