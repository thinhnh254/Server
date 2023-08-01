const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        email: userEmail,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email is exist?
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          message: "Your email is already in used, Try another email",
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await User.create({
        name: data.name,
        email: data.email,
        password: hashPasswordFromBcrypt,
        phone: data.phone,
      });

      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser,
};
