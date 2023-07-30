const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
const port = process.env.PORT || 3515;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect("mongodb://localhost:27017/Database", {
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
