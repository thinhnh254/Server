const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config(); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// cloudinary.config({
//   cloud_name: "dvek7rdhy",
//   api_key: "352895776947259",
//   api_secret: "pngyAuWp85Y--XLC9tkcTqZ8dVI",
// });

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "fatme",
  },
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
